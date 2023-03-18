import { Drone, DroneStatus, IDrone } from "../db/drone";
import express from "express";

const router = express();

// Get all drones
router.get("/", async (req, res) => {
  const allDonuts = await Drone.find();
  console.log(allDonuts);
  res.json(allDonuts);
});

// Get a specific drone
router.get("/droneId", async (req, res) => {
  // To be added
  console.log("Get a specific drone");
});

// Create a specific drone
router.post("/droneId", async (req, res) => {
  // To be added
  console.log("Create a specific drone");
});

// Update a specific drone
router.put("/droneId", async (req, res) => {
  // To be added
  console.log("Update a specific drone");
});

// Delete a specific drone
router.delete("/droneId", async (req, res) => {
  // To be added
  console.log("Delete a specific drone");
});

export { router as droneRouter };