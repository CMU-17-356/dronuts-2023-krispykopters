import express from "express";
import { Store } from "../db/store";
import { Donut, IDonut } from "../db/donut";

export const storeRouter = express.Router();

// Retrieve information for all stores, generally used for debugging
storeRouter.get("/api/stores", async (req, res) => {
  const allStores = await Store.find().populate("donutStock");
  console.log("GET /api/stores")
  console.log(allStores);
  res.json(allStores);
});

// Retrieve information for one store, used for production
storeRouter.get("/api/store/:name", async (req, res) => {
  const store = await Store.findOne({ name: req.params["name"] }).populate("donutStock");
  console.log(`GET /api/store/${req.params["name"]}`)
  console.log(store);
  res.json(store);
});

// Add new donut
storeRouter.post("/api/store/:name/donut", async (req, res) => {
  console.log(`POST /api/store/${req.params["name"]}/donut - ${JSON.stringify(req.body)}`);

  const donutJson = req.body;

  // console.log(`id: ${donutJson.id}`);
  // console.log(`title: ${donutJson.title}`);
  // res.sendStatus(200);

  try {
    const store = await Store.findOne({ name: req.params["name"] });

    const donut: IDonut = {
      id: donutJson.id,
      title: donutJson.title,
      description: donutJson.description,
      price: donutJson.price,
      calories: donutJson.calories,
      qty: donutJson.qty,
      category: donutJson.category,
      imageURL: donutJson.imageURL,
    };

    const donutDoc = await new Donut(donut).save();

    store?.donutStock.push(donutDoc._id);

    await store?.save();

    res.sendStatus(200);
  }
  catch (e: unknown) {
    res.sendStatus(400);
  }
});

// Update donut
storeRouter.post("/api/store/:name/donut", async (req, res) => {
  console.log(`PUT /api/store/${req.params["name"]}/donut - ${req.body}`);
});

// Delete donut
storeRouter.delete("/api/store/:name/donut/:_id", async (req, res) => {

  console.log(`DELETE /api/store/${req.params["name"]}/donut/${req.params["_id"]}`);

  try {
    await Donut.findByIdAndDelete(req.params["_id"]);
    console.log(`Deleted donut: ${req.params["_id"]}`);
    await Store.findOneAndUpdate({ name: req.params["name"] }, { $pull: { donutStock: req.params["_id"]}});
    console.log(`Deleted donut from store: ${req.params["name"]}`);

    res.sendStatus(200);
  }
  catch (e: unknown) {
    res.sendStatus(400);
  }
});