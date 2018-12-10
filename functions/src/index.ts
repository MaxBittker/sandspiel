// import * as stream from "stream";
// import * as mimeTypes from "mimeTypes";
import * as uuidv4 from "uuid/v4";

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
// Create a new creation, get its sentiment using Google Cloud NLP,
// and categorize the sentiment before saving.
app.post("/creations", async (req, res) => {
  const { title, image, cells } = req.body;
  try {
    const bucket = admin.storage().bucket();
    const id = uuidv4();
    const data = { title, id };

    // Convert the base64 string back to an image to upload into the Google Cloud Storage bucket

    const mimeType = image.match(
        /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
      )[1],
      filename = `img-${id}.png`,
      base64EncodedImageString = image.replace(/^data:image\/\w+;base64,/, ""),
      imageBuffer = new Buffer(base64EncodedImageString, "base64");

    // Upload the image to the bucket
    const file = bucket.file("creations/" + filename);

    await file.save(imageBuffer, {
      metadata: { contentType: mimeType },
      public: true,
      validation: "md5"
    });

    const filename2 = `data-${id}.png`,
      base64EncodedImageString2 = cells.replace(/^data:image\/\w+;base64,/, ""),
      imageBuffer2 = new Buffer(base64EncodedImageString2, "base64");

    // Upload the image to the bucket
    const file2 = bucket.file("creations/" + filename2);

    await file2.save(imageBuffer2, {
      metadata: { contentType: mimeType },
      public: true,
      validation: "md5"
    });

    await admin
      .firestore()
      .collection("creations")
      .add(data);
    res.status(201).json({ id, score: 0 });
  } catch (error) {
    console.log("Error detecting sentiment or saving message", error.message);
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
    .limit(50);
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

// // GET /api/creation/{id}
// // Get details about a message
// app.get("/message/:messageId", async (req, res) => {
//   const messageId = req.params.messageId;
//   try {
//     const snapshot = await admin
//       .database()
//       .ref(`/creationss/${messageId}`)
//       .once("value");
//     if (!snapshot.exists()) {
//       return res.status(404).json({
//         errorCode: 404,
//         errorMessage: `message '${messageId}' not found`
//       });
//     }
//     return res.set("Cache-Control", "private, max-age=300");
//   } catch (error) {
//     console.log("Error getting message details", messageId, error.message);
//     return res.sendStatus(500);
//   }
// });

// Expose the API as a function
exports.api = functions.https.onRequest(app);
