import { Donut, IDonut } from "../db/donut";
import express from "express";

const router = express();

// Get all donuts
router.get("/api/donuts", async (req, res) => {
  const allDonuts = await Donut.find();
  console.log(allDonuts);
  res.json(allDonuts);
});

// Get a specific donut
router.get("/api/donut/:id", async (req, res) => {
  try {
    const donut = await Donut.findOne({ _id: req.params["id"] });
    if (!donut) {
      throw new Error(`Donut with ID ${req.params["id"]} not found`);
    }
    res.json(donut);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Donut not found" });
  }
});

// Create a specific donut
router.post("/api/donut/:id", async (req, res) => {
  // To be added
  console.log("Create a specific donut");
});

// Update a specific donut
router.put("/api/donut/:id", async (req, res) => {
  // To be added
  console.log("Update a specific donut");
});

// Delete a specific donut
router.delete("/api/donut/:id", async (req, res) => {
  // To be added
  console.log("Delete a specific donut");
});

export { router as donutRouter };
