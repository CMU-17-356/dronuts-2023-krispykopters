import { app } from "./index";
import { Donut, IDonut } from "./db/donut";

// Get all donuts
app.get("/api/donuts", async (req, res) => {
  const allDonuts = await Donut.find();
  console.log(allDonuts);
  res.json(allDonuts);
});
