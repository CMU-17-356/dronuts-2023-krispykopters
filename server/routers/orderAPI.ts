import { Order, IOrder } from "../db/order";
import express from "express";
import {Donut, IDonut} from "../db/donut";
import {Customer, ICustomer} from "../db/customer";
import {Types} from "mongoose";
import store from "../db/store";

const router = express.Router();

// Get all orders
router.get("/api/orders", async (req, res) => {
  const allOrders = await Order.find().populate("customer").populate("donuts");
  console.log(allOrders);
  res.json(allOrders);
});

// Get a specific order
router.get("/api/order/:id", async (req, res) => {
  const order = await Order.findById( req.params["id"] ).populate("customer").populate("donuts");
  console.log(`GET /api/order/${req.params["id"]}`)
  console.log(order);
  res.json(order);
});


// Create a specific order
router.post("/api/order", async (req, res) => {
  // To be added
  console.log(`POST /api/order - ${JSON.stringify(req.body)}`);
  const orderJson = req.body;
  const cartItems = orderJson.cartItems;
  const DonutItems = orderJson.DonutItems;
  const fids: Types.ObjectId[] = [];

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const storeDonut = await Donut.findOne({id: item.fid});

    if (storeDonut) {
      await Donut.findByIdAndUpdate(storeDonut._id, {qty: storeDonut.qty - item.qty});

      const donut: IDonut = {
        id: storeDonut.id,
        price: storeDonut.price,
        qty: item.qty,
        imageURL: storeDonut.imageURL,
        title: storeDonut.title,
        description: storeDonut.description,
        calories: storeDonut.calories,
        category: storeDonut.category
      };
      const donutDoc = await new Donut(donut).save();
      fids.push(donutDoc._id);
    }
  }

  const customerDoc = await Customer.findOne({username: "TrueLordOfTheRing"});

  if (!customerDoc) {
    res.sendStatus(400);
    return;
  }

  // Update stock in store
  const order: IOrder = {
    customer: customerDoc._id,
    donuts: fids,
    location: {
        lat: orderJson.lat,
        long: orderJson.lng,
    },
    status: "Placed",
    drone: orderJson.drone,
    orderTime: new Date(Date.now()),
  };

  try {
    await new Order(order).save();
    res.sendStatus(200);
  }
  catch (e: unknown) {
    res.sendStatus(400);
  }
});

// Update a specific order
router.put("/api/order/:id", async (req, res) => {
  
  const orderId = req.params["id"];
  const orderJson = req.body;
  console.log(`PUT /api/order/${orderId} - ${JSON.stringify(orderJson)}`);

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, {
      customer: orderJson.customer,
      donuts: orderJson.donuts,
      location: orderJson.location,
      orderTime: orderJson.orderTime,
      drone: orderJson.drone,
      status: orderJson.status,
    }, { new: true });
    console.log(`Order with ID ${orderId} updated: ${JSON.stringify(updatedOrder)}`);
    res.sendStatus(200);
  } catch (error) {
    console.error(`Error updating order with ID ${orderId}: ${error}`);
    res.sendStatus(500);
  }
});

// Delete a specific order
router.delete("/api/order/:id", async (req, res) => {
  // To be added
  console.log("Delete a specific order");
});

export { router as orderRouter };