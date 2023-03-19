// Basic import
import cors from "cors";
import express from "express";
import path from "path";
import mongoose from "mongoose";

// Import Schemas & Interfaces for db define
import { Donut, IDonut } from "./db/donut";
import { Customer, ICustomer } from "./db/customer";
import { IOrder, Order } from "./db/order";
import { IStore, Store } from "./db/store";

// Acquire the routers
import { customerRouter } from "./routers/customerAPI"
import { donutRouter } from "./routers/donutAPI"
import { orderRouter } from "./routers/orderAPI"
import { storeRouter } from "./routers/storeAPI"

/**
 * Main App Express
 * host & port
 */
const app = express();
const host = "0.0.0.0";
const port = 3000;

// Link the api routers to sub path
app.use('/customer', customerRouter);
app.use('/donut', donutRouter);
app.use('/drone', droneRouter);
app.use('/order', orderRouter);

/**
 * Database Connection func
 */
async function connectToMongo() {
  // When set to "false", Mongoose will allow query conditions to match multiple properties.
  mongoose.set("strictQuery", false);

  // Connect to MongoDB
  await mongoose.connect(`${process.env.MONGO_DB}`);

  // If the DB is empty, create dummy data
  if ((await Order.collection.countDocuments()) === 0) {
    await createDummyOrder();
  }
  if (await Store.collection.countDocuments() === 0) {
    await createDummyStore();
  }

  console.log("Mongo DB connection established");
}

/**
 * Create Dummy Store
 */
async function createDummyStore() {
  // Mock Drone data
  console.log("Inserting dummy Donut document")
  const donut: IDonut = {
    id: 1,
    price: 1.99,
    qty: 24,
    imageURL: "https://thefirstyearblog.com/wp-content/uploads/2020/10/chocolate-donuts-Square2.png",
    title: "Triple Choco",
    description: "Chocolate doughnut + chocolate glaze + chocolate sprinkles = delicious.",
    calories: "200 kCal",
    category: "Featured"
  };
  const donutDoc = await new Donut(donut).save();

  const store: IStore = {
    name: "admin",
    password: "password",
    location: {
      lat: 40.443336,
      long: -79.944023
    },
    droneCapacity: 3,
    donutStock: [donutDoc._id],
    bankAccount: "account info",
  };
  await new Store(store).save();
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
    status: "Placed"
  };
  await new Order(order).save();
}

// Connect
connectToMongo();

// Enables CORS (cross-origin resource sharing).
// In order for your server to be accessible by other origins (domains).
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "build")));

// Testing
app.get("/api/testing", (req, res) => {
  res.json({ id: 1, testing: "sucessful test" });
});

// Middleware
app.use(express.json());

// Subroutes
app.use(customerRouter);
app.use(donutRouter);
app.use(orderRouter);
app.use(storeRouter);

// API listen
app.listen(port, host, () => {
  console.log(`Starting server with directory ${__dirname}`);
  console.log(`Example app listening on port ${port}`);
});

// Index Page
/* app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
}); */

export { app };
