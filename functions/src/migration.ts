//this script was used to migrate 60k firebase documents into postgres.

// ./cloud_sql_proxy -instances=sandtable-8d0f7:us-central1:sandspiel-db=tcp:5432

// import * as pg from "pg";
// import * as admin from "firebase-admin";
const pg = require("pg");
const admin = require("firebase-admin");

const dbUser = "postgres";
const dbPassword = "";
const dbName = "sandspiel";

const pgConfig = {
  max: 1,
  user: dbUser,
  password: dbPassword,
  database: dbName
};

const pgPool = new pg.Pool(pgConfig);

admin.initializeApp();

let snapshot;
let n = 0;

async function migrate() {
  //   let q;
  if (!snapshot) {
    snapshot = await admin
      .firestore()
      .collection(`/creations`)
      .doc("uujCtKe4ZrOUQPe3VUhB")
      .get();
    // let doc = snapshot.get();
    // console.log(doc);
  }
  //     q = await admin
  //       .firestore()
  //       .collection(`/creations`)
  //       .orderBy("timestamp")
  //       .limit(500)
  //       .get();
  //   } else {
  let q = await admin
    .firestore()
    .collection(`/creations`)
    .orderBy("timestamp")
    .startAfter(snapshot)
    .limit(500)
    .get();
  //   }
  for (const doc of q.docs) {
    const publicId = doc.id;
    const data = doc.data();
    n++;
    snapshot = doc;
    console.log(n + " " + new Date(data.timestamp).toLocaleDateString());

    const text =
      "INSERT INTO creations(id, data_id, title, score, timestamp) VALUES($1, $2, $3, $4, to_timestamp( $5 / 1000.0) )";
    const values = [publicId, data.id, data.title, data.score, data.timestamp];
    try {
      await pgPool.query(text, values);
      console.log("wrote creation: " + publicId);
    } catch (err) {
      console.error("error writing creation" + err.message + err.name);
    }
  }
  if (q.size > 0) {
    migrate();
  }
}

migrate();
