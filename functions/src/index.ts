// import * as stream from "stream";
// import * as mimeTypes from "mimeTypes";
import * as crypto from "crypto";

import * as functions from "firebase-functions";
import * as c from "cors";
const cors = c({ origin: true });

import * as admin from "firebase-admin";
admin.initializeApp();

import * as express from "express";

const app = express();
app.use(cors);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// POST /api/creations
// Create a new creation, and upload two image
app.post("/creations", async (req, res) => {
  const { title, image, cells } = req.body;
  try {
    const bucket = admin.storage().bucket();
    const id = crypto
      .createHash("md5")
      .update(cells)
      .digest("hex");

    const exists = await admin
      .firestore()
      .collection("creations")
      .where("id", "==", id)
      .get()
      .then(function(querySnapShot) {
        return !querySnapShot.empty;
      });
    if (exists) {
      res.sendStatus(202).json({ id: "already exists" });
      return;
    }

    const data = {
      title: title.slice(0, 200),
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
      const imageBuffer = new Buffer(base64EncodedImageString, "base64");

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

    await admin
      .firestore()
      .collection("creations")
      .add(data);

    res.status(201).json({ id });
  } catch (error) {
    console.log("Error saving message", error.message);
    res.sendStatus(500);
  }
});

// saving message Reference.push failed: first argument contains
// undefined in property 'creations.0.title'
// GET /api/creations?q={q}
// Get all creations, optionally specifying a string to filter on
app.get("/creations", async (req, res) => {
  const q = req.query.q;
  const query = admin
    .firestore()
    .collection(`/creations`)
    .orderBy("timestamp", "desc")
    .limit(200);
  if (q) {
    res.status(404).json({
      errorCode: 404,
      errorMessage: `creation '${q}' not found`
    });
    return;
  }
  try {
    const snapshot = await query.get();
    // snapshot
    const creations = [];
    snapshot.forEach(childSnapshot => {
      creations.push({
        id: childSnapshot.id,
        data: childSnapshot.data()
      });
      return true;
    });

    res.status(200).json(creations);
  } catch (error) {
    console.log("Error getting creations", error.message);
    res.sendStatus(500);
  }
});

// GET /api/creation/{id}
// Get details about a message
app.put("/creations/:id/vote", async (req, res) => {
  const id = req.params.id;
  try {
    const doc_ref = await admin
      .firestore()
      .collection(`/creations`)
      .doc(id);

    // debugger.
    await admin.firestore().runTransaction(t =>
      t
        .get(doc_ref)
        .then(doc => {
          if (doc.exists) {
            const new_score = doc.data().score + 1;
            t.update(doc_ref, { score: new_score });
            res.status(200).json({ ...doc.data(), score: new_score });
          } else {
            res.status(404).json({
              errorCode: 404,
              errorMessage: `message '${id}' not found`
            });
          }
        })
        .catch(error => {
          console.log("Error incrementing vote", id, error.message);
        })
    );
  } catch (error) {
    console.log("Error incrementing vote", id, error.message);
    res.sendStatus(500);
  }
});

// Expose the API as a function
exports.api = functions.https.onRequest(app);
