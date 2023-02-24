import cors from "cors";
import express from "express";
import path from "path";
import mongoose from 'mongoose';
import { DroneStatus, IDrone, Drone } from "./db/drone";
import { Donut, IDonut } from "./db/donut";
import { Customer, ICustomer } from "./db/customer";
import { IOrder, Order } from "./db/order";

const app = express();
const host = '0.0.0.0';
const port = 3000;

async function connectToMongo() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(`${process.env.MONGO_DB}`);

  // Sample data

  if (await Drone.collection.countDocuments() === 0) {
    console.log("Inserting dummy Drone document")
    const drone: IDrone = {
      name: "Frodo",
      battery: 0.5,
      location: {
        lat: 40.4432,
        long: 79.9428
      },
      status: DroneStatus.Recharging
    };
    await new Drone(drone).save();
  }

  if (await Order.collection.countDocuments() === 0) {
    console.log("Inserting dummy Donut document")
    const donut: IDonut = {
      id: 1,
      price: 1.99,
      qty: 10,
      imageURL: "https://thefirstyearblog.com/wp-content/uploads/2020/10/chocolate-donuts-Square2.png",
      title: "Triple Choco",
      description: "Chocolate doughnut + chocolate glaze + chocolate sprinkles = delicious.",
      calories: "200 kCal",
      category: "Featured"
    };
    const donutDoc = await new Donut(donut).save();

    console.log("Inserting dummy Customer document")
    const customer: ICustomer = {
      username: "TrueLordOfTheRing",
      password: "RuleThemAll",
      displayName: "Sauron the Terrible"
    };
    const customerDoc = await new Customer(customer).save();

    console.log("Inserting dummy Order document")
    const order: IOrder = {
      customer: customerDoc._id,
      donuts: [donutDoc._id],
      location: {
        lat: 40.4444,
        long: 79.9532
      },
      orderTime: new Date(Date.now())
    };
    await new Order(order).save();
  }

  console.log("Mongo DB connection established");
}

connectToMongo();

app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/api/testing', (req, res) => {
  res.json({ id: 1, name: 'glazed donut' });
});

app.get('/api/donuts', async (req, res) => {
  const allDonuts = await Donut.find();
  console.log(allDonuts);
  res.json(allDonuts)
});

app.get('/api/drones', async (req, res) => {
  const allDrones = await Drone.find();
  console.log(allDrones);
  res.json(allDrones)
});

app.get('/api/orders', async (req, res) => {
  const allOrders =
    await Order
      .find()
      .populate('customer')
      .populate('donuts');
  console.log(allOrders);
  res.json(allOrders)
});

app.get('*', async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, host, () => {
  console.log(`Starting server with directory ${__dirname}`)
  console.log(`Example app listening on port ${port}`);
});

export { app };