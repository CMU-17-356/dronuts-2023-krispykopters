import express from "express";
import { Store } from "../db/store";

export const storeRouter = express.Router();

// Retrieve information for all stores, generally used for debugging
storeRouter.get("/api/stores", async (req, res) => {
  const allStores = await Store.find().populate("donutStock");
  console.log(allStores);
  res.json(allStores);
});

// Retrieve information for one store, used for production
storeRouter.get("/api/store/:name", async (req, res) => {
  const allStores = await Store.findOne({ name: req.params["name"] }).populate("donutStock");
  console.log(allStores);
  res.json(allStores);
});

// Add new donut
storeRouter.post("/api/store/:name/donut", async (req, res) => {
  console.log(req.body())
});

// Update donut
storeRouter.put("/api/store/:name/donut", async (req, res) => {
  console.log(req.body())
});

// Delete donut
storeRouter.delete("/api/store/:name/donut/:_id", async (req, res) => {
  console.log(req.body())
});