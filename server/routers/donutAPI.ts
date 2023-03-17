import { Donut, IDonut } from "../db/donut";
import express from "express";

const router = express();

// Get all donuts
router.get("/", async (req, res) => {
  const allDonuts = await Donut.find();
  console.log(allDonuts);
  res.json(allDonuts);
});

// Get a specific donut
router.get("/donutId", async (req, res) => {
  // To be added
  console.log("Get a specific donut");
});

// Create a specific donut
router.post("/donutId", async (req, res) => {
  // To be added
  console.log("Create a specific donut");
});

// Update a specific donut
router.put("/donutId", async (req, res) => {
  // To be added
  console.log("Update a specific donut");
});

// Delete a specific donut
router.delete("/donutId", async (req, res) => {
  // To be added
  console.log("Delete a specific donut");
});

export { router as donutRouter };
