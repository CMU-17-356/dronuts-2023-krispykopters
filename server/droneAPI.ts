import { app } from "./index";
import { Drone, DroneStatus, IDrone } from "./db/drone";

// Get all drones
app.get("/api/drones", async (req, res) => {
  const allDrones = await Drone.find();
  console.log(allDrones);
  res.json(allDrones);
});
