// Basic import
import cors from "cors";
import express from "express";
import path from "path";
import mongoose from "mongoose";

// Import Schemas & Interfaces for db define
import { Drone, DroneStatus, IDrone } from "./db/drone";
import { Donut, IDonut } from "./db/donut";
import { Customer, ICustomer } from "./db/customer";
import { Order, IOrder } from "./db/order";

/**
 * Express Framework
 * host & port
 */
const app = express();
const host = "0.0.0.0";
const port = 3000;

/**
 * Database Connection func
 */
async function connectToMongo() {
  // When set to "false", Mongoose will allow query conditions to match multiple properties.
  mongoose.set("strictQuery", false);

  // Connect to MongoDB
  await mongoose.connect(`${process.env.MONGO_DB}`);

  // Dummy Data if collection is empty
  if ((await Drone.collection.countDocuments()) === 0) {
    console.log("Inserting dummy Drone document");
    // Mock Drone data
    const drone: IDrone = {
      name: "Frodo",
      battery: 0.5,
      location: {
        lat: 40.4432,
        long: 79.9428,
      },
      status: DroneStatus.Recharging,
    };
    await new Drone(drone).save();
  }

  // If the DB is empty, create dummy data
  if ((await Order.collection.countDocuments()) === 0) {
    createDummyOrder();
  }

  console.log("Mongo DB connection established");
}

/**
 * Create Dummy Order
 */
async function createDummyOrder() {
  // Mock Drone data
  console.log("Inserting dummy Donut document");
  const donut: IDonut = {
    id: 1,
    price: 1.99,
    qty: 10,
    imageURL:
      "https://thefirstyearblog.com/wp-content/uploads/2020/10/chocolate-donuts-Square2.png",
    title: "Triple Choco",
    description:
      "Chocolate doughnut + chocolate glaze + chocolate sprinkles = delicious.",
    calories: "200 kCal",
    category: "Featured",
  };
  const donutDoc = await new Donut(donut).save();

  // Mock Customer data
  console.log("Inserting dummy Customer document");
  const customer: ICustomer = {
    username: "TrueLordOfTheRing",
    password: "RuleThemAll",
    displayName: "Sauron the Terrible",
  };
  const customerDoc = await new Customer(customer).save();

  // Mock Order data
  console.log("Inserting dummy Order document");
  const order: IOrder = {
    customer: customerDoc._id,
    donuts: [donutDoc._id],
    location: {
      lat: 40.4444,
      long: 79.9532,
    },
    orderTime: new Date(Date.now()),
  };
  await new Order(order).save();
}

// Connection
connectToMongo();

app.use(cors());

app.use(express.static(path.join(__dirname, "..", "build")));

// Index Page
app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// Testing
app.get("/api/testing", (req, res) => {
  res.json({ id: 1, name: "glazed donut" });
});

// API listen
app.listen(port, host, () => {
  console.log(`Starting server with directory ${__dirname}`);
  console.log(`Example app listening on port ${port}`);
});

export { app };
