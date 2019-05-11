import * as crypto from "crypto";
import * as functions from "firebase-functions";
import * as c from "cors";
import * as Twit from "twit";
import * as wordfilter from "wordfilter";
import * as cookieParser from "cookie-parser";
import * as pg from "pg";
import admins from "./admins";

const connectionName = functions.config().pg.connection_name;
const dbUser = functions.config().pg.user;
const dbPassword = functions.config().pg.password;
const dbName = functions.config().pg.name;

const pgConfig: pg.PoolConfig = {
  max: 1,
  user: dbUser,
  password: dbPassword,
  database: dbName
};

if (process.env.NODE_ENV === "production") {
  pgConfig["host"] = `/cloudsql/${connectionName}`;
}

// Connection pools reuse connections between invocations,
// and handle dropped or expired connections automatically.
const pgPool: pg.Pool = new pg.Pool(pgConfig);

wordfilter.removeWord("homo");
wordfilter.removeWord("crazy");
wordfilter.addWords(["rape"]);

const T = new Twit({
  consumer_key: functions.config().twitter.consumer_key.key,
  consumer_secret: functions.config().twitter.consumer_secret,
  access_token: functions.config().twitter.access_token,
  access_token_secret: functions.config().twitter.access_token_secret,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: false // optional - requires SSL certificates to be valid.
});

function Tweet(b64content, title, id) {
  // first we must post the media to Twitter
  T.post("media/upload", { media_data: b64content }, function(
    err,
    res_data,
    response
  ) {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    const mediaIdStr = res_data["media_id_string"];
    const altText = title;
    const meta_params = {
      media_id: mediaIdStr,
      alt_text: { text: altText }
    };

    T.post("media/metadata/create", meta_params, function(post_err, post_data) {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        const params = {
          status: `${title.replace(/@/g, "")}\n https://sandspiel.club/#${id}`,
          media_ids: [mediaIdStr]
        };

        T.post("statuses/update", params, function(_, _data) {
          console.log("TWEETED" + JSON.stringify(_data));
        });
      } else {
        console.error("twitter api error" + err);
      }
    });
  });
}

const cors = c({ origin: true });

import * as admin from "firebase-admin";
admin.initializeApp();

import * as express from "express";

const app = express();
app.use(cors);
app.use(cookieParser());

// POST /api/creations
// Create a new creation, and upload two image
app.post("/creations", async (req, res) => {
  const { title, image, cells } = req.body;

  if (wordfilter.blacklisted(title)) {
    res.sendStatus(418);
    return;
  }
  const trimmed_title = title.slice(0, 200);

  try {
    const bucket = admin.storage().bucket();

    const id = crypto
      .createHash("md5")
      .update(cells)
      .digest("hex");

    const publicId = id.slice(0, 20);

    const exists = await pgPool.query(
      "SELECT exists( SELECT 1 FROM creations WHERE id = $1 )",
      [publicId]
    );
    if (exists.rows[0].exists) {
      res.sendStatus(202).json({ id: "already exists" });
      return;
    }

    const data = {
      title: trimmed_title,
      id,
      score: 0,
      timestamp: Date.now()
    };

    // Upload the image to the bucket
    function uploadPNG(pngData, suffix) {
      const mimeType = pngData.match(
        /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
      )[1];
      const filename = `creations/${id}${suffix}`;
      const base64EncodedImageString = pngData.replace(
        /^data:image\/\w+;base64,/,
        ""
      );
      const imageBuffer = Buffer.from(base64EncodedImageString, "base64");

      const file = bucket.file(filename);

      return file.save(imageBuffer, {
        metadata: { contentType: mimeType },
        public: true,
        validation: "md5"
      });
    }

    await Promise.all([
      uploadPNG(cells, ".data.png"),
      uploadPNG(image, ".png")
    ]);

    const text =
      "INSERT INTO creations(id, data_id, title, score, timestamp) VALUES($1, $2, $3, $4, to_timestamp( $5 / 1000.0) )";
    const values = [publicId, data.id, data.title, data.score, data.timestamp];

    try {
      await pgPool.query(text, values);
      res.status(201).json({ id });
    } catch (err) {
      console.error(
        "error writing creation" + err.message + err.name + err.stack
      );
      res.sendStatus(500);
      return;
    }

    // post a tweet with media
    const b64content = image.replace(/^data:image\/\w+;base64,/, "");

    Tweet(b64content, trimmed_title, publicId);
  } catch (error) {
    console.error("Error saving message", error.message);
    res.sendStatus(500);
  }
});

// GET /api/creations?q={q}
// Get all creations, optionally specifying a string to filter on
app.get("/creations", async (req: express.Request, res) => {
  const { q, d, title } = req.query;

  try {
    let browse: pg.QueryResult;
    if (title) {
      browse = await pgPool.query(
        `SELECT *  FROM creations
         WHERE LOWER(title) ~ $1
         ORDER BY score DESC,  timestamp DESC
         LIMIT 300`,
        [title.toLowerCase()]
      );
    } else if (d) {
      browse = await pgPool.query(
        `SELECT * 
        FROM creations c
        WHERE timestamp > NOW() - INTERVAL '${parseInt(d, 10)} days'
        AND NOT EXISTS(
          SELECT
          FROM rulings as r
          WHERE r.id = c.id and r.bad = 'yes'
        )
         ORDER BY score DESC
         LIMIT 300`
      );
    } else {
      browse = await pgPool.query(
        `SELECT *  
        FROM creations c 
        WHERE NOT EXISTS(
          SELECT
          FROM rulings as r
          WHERE r.id = c.id and r.bad = 'yes'
        )
        ORDER BY ${q === "score" ? "score" : "timestamp"} desc LIMIT 300`
      );
    }
    const creations = browse.rows.map(row => {
      return {
        id: row.id,
        data: {
          id: row.data_id,
          title: row.title,
          score: row.score,
          timestamp: row.timestamp
        }
      };
    });

    if (q === "toprecent") {
      creations.sort((a, b) => b.data.score - a.data.score);
    }
    res.status(200).json(creations);
  } catch (error) {
    console.error("Error getting creations", error.message);
    res.sendStatus(500);
  }
});

// GET /api/reports
// Get all actionable reports,
app.get("/reports", async (req: express.Request, res) => {
  try {
    const browse: pg.QueryResult = await pgPool.query(`
      SELECT
          C.ID,
          c.data_id,
          c.title,
          c.timestamp,
          c.score,
          COUNT(R.id) AS reportcount
      FROM
          creations AS C
          RIGHT JOIN reports AS R ON R.id = C.ID
          LEFT JOIN rulings AS J ON J.id = C.ID
      WHERE j.id is NULL
      GROUP BY
          C.ID
      ORDER BY
          reportcount DESC, c.timestamp DESC
      LIMIT 300`);
    const creations = browse.rows.map(row => {
      return {
        id: row.id,
        data: {
          id: row.data_id,
          title: row.title,
          score: row.score,
          timestamp: row.timestamp,
          reports: row.reportcount
        }
      };
    });

    res.status(200).json(creations);
  } catch (error) {
    console.error("Error getting reports", error.message);
    res.sendStatus(500);
  }
});

// GET /api/creations/{id}
// Get details about a message
app.get("/creations/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const get = await pgPool.query("SELECT *  FROM creations WHERE id = $1", [
      id
    ]);

    if (get.rowCount > 0) {
      const { data_id, score, timestamp, title } = get.rows[0];
      res.status(200).json({ id: data_id, score, timestamp, title, data_id });
    } else {
      res.status(404).json({
        errorCode: 404,
        errorMessage: `submission '${id}' not found`
      });
    }
  } catch (error) {
    console.error("Error finding creation", id, error.message);
    res.sendStatus(500);
  }
});

app.put("/creations/:id/vote", async (req, res) => {
  const id = req.params.id;
  const ip = req.header("x-appengine-user-ip");

  try {
    const values = [id, ip];

    try {
      const exists = await pgPool.query(
        "SELECT exists( SELECT 1 FROM votes WHERE id = $1 AND ip = $2 )",
        values
      );

      if (exists.rows[0].exists) {
        res.sendStatus(301);
        return;
      }
    } catch (err) {
      console.log(err.stack);
      res.sendStatus(500);
      return;
    }

    const insert = "INSERT INTO votes(id, ip) VALUES($1, $2)";
    try {
      await pgPool.query(insert, values);
    } catch (err) {
      console.error(err.stack);
    }

    const update =
      "UPDATE creations SET score=score+1 WHERE id = $1 RETURNING *";
    try {
      const result: pg.QueryResult = await pgPool.query(update, [id]);
      res.status(200).json({ ...result.rows[0] });
    } catch (err) {
      console.error("error updating score" + err.message + err.stack);
      res.sendStatus(500);
    }
  } catch (error) {
    console.error("Error incrementing vote", id, error.message);
  }
});

app.put("/creations/:id/report", async (req, res) => {
  const id = req.params.id;
  const ip = req.header("x-appengine-user-ip");

  try {
    const values = [id, ip];

    try {
      const exists = await pgPool.query(
        "SELECT exists( SELECT 1 FROM reports WHERE id = $1 AND ip = $2 )",
        values
      );

      if (exists.rows[0].exists) {
        res.sendStatus(301);
        return;
      }
    } catch (err) {
      console.log(err.stack);
      res.sendStatus(500);
      return;
    }

    const insert = "INSERT INTO reports(id, ip) VALUES($1, $2)";
    try {
      await pgPool.query(insert, values);
    } catch (err) {
      console.error(err.stack);
    }
    res.status(200).json({ result: "success" });
  } catch (error) {
    console.error("Error reporting post", id, error.message);
  }
});

const validateFirebaseIdToken = async (req, res, next) => {
  console.log("Check if request is authorized with Firebase ID token");

  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)
  ) {
    console.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Firebase ID Token>",
      'or by passing a "__session" cookie.'
    );
    res.status(403).send("Unauthorized");
    return;
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send("Unauthorized");
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log("ID Token correctly decoded", decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error("Error while verifying Firebase ID token:", error);
    res.status(403).send("Unauthorized");
    return;
  }
};

app.put("/creations/:id/judge", validateFirebaseIdToken, async (req, res) => {
  const id = req.params.id;
  // const ip = req.header("x-appengine-user-ip");
  const { ruling } = req.query;
  const { email } = req["user"];
  if (!admins.includes(email)) {
    res.status(403).send("Not Admin");
    return;
  }
  // res.status(200).json({ result: "success", ruling, user: req["user"].email });
  try {
    const values = [id, ruling];

    const insert = "INSERT INTO rulings(id, bad) VALUES($1, $2)";
    try {
      await pgPool.query(insert, values);
    } catch (err) {
      console.error(err.stack);
    }
    res.status(200).json({ result: "success" });
  } catch (error) {
    console.error("Error making ruling post", id, error.message);
  }
});

// GET /api/trending
// Get trending hashtags
app.get("/trending", async (req: express.Request, res) => {
  try {
    const trending: pg.QueryResult = await pgPool.query(
      `SELECT * FROM (
          SELECT unnest(hashtag) as hashtag, count(hashtag) AS htcount
          FROM(
            SELECT DISTINCT hashtag, id 
            FROM (
                  SELECT REGEXP_MATCHES(LOWER(title), '#([^\\s.?!]+)', 'g') AS hashtag, id 
                  FROM (
                      SELECT * FROM creations
                      ORDER BY timestamp DESC LIMIT 1000
                  ) a
                  WHERE title LIKE '%#%'
              ) b 
          ) c
          GROUP BY hashtag
          ORDER BY htcount desc
        ) d
        WHERE htcount > 2 and length(hashtag) > 1;`
    );
    console.log(JSON.stringify(trending.rows));
    res.status(200).json(trending.rows);
  } catch (error) {
    console.error("Error getting creations", error.message);
    res.sendStatus(500);
  }
});

// Expose the API as a function
exports.api = functions.https.onRequest(app);
