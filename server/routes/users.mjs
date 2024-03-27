import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 users
router.get("/", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({}).limit(50).toArray();

  res.send(results).status(200);
});

// Fetches the latest users
router.get("/latest", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection
    .aggregate([
      { $project: { name: 1, pass: 1 } },
      { $sort: { date: -1 } },
      { $limit: 3 },
    ])
    .toArray();
  res.send(results).status(200);
});

// Get a single user by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Check if user already exists
router.get("/username/:username", async (req, res) => {
  let collection = await db.collection("users");
  let query = { username: req.params.username };
  let result = await collection.findOne(query);

  if (!result) res.send(false);
  else res.send(true);
});

// Verify login credentials
router.post("/login", async (req, res) => {
  let collection = await db.collection("users");
  // let newDocument = req.body;
  let query = { username: req.body.username, password: req.body.password };
  let result = await collection.findOne(query);

  res.send(result).status(204);
  // if (!result) res.send(false);
  // else res.send(true);
});

// Add a new document to the collection
router.post("/signup", async (req, res) => {
  let collection = await db.collection("users");
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

export default router;
