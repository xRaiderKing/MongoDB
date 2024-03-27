import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Fetches the conferences corresponding to the page and page size
router.post("/", async (req, res) => {
  let collection = await db.collection("conferences");
  let results = await collection
    .find()
    .skip((req.body.page - 1) * req.body.pageSize)
    .limit(req.body.pageSize)
    .toArray();

  res.send(results).status(200);
});

// Get a single conference
router.get("/:id", async (req, res) => {
  let collection = await db.collection("conferences");
  let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/add", async (req, res) => {
  let collection = await db.collection("conferences");
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Update the conference
router.patch("/:id", async (req, res) => {
  console.log("UPDATE", req.body);
  const query = { _id: ObjectId(req.params.id) };
  const updates = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      schedules: req.body.schedules,
      attendees: req.body.attendees,
      availableSpots: req.body.availableSpots,
    },
  };

  let collection = await db.collection("conferences");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("conferences");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
