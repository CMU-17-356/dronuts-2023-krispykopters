import { Order, IOrder } from "../db/order";
import express from "express";
import {Donut, IDonut} from "../db/donut";
import {Coord, Customer} from "../../types";
import {Types} from "mongoose";
import {ICoord} from "../db/coord";

const router = express.Router();

// Get all orders
router.get("/api/orders", async (req, res) => {
  const allOrders = await Order.find().populate("customer").populate("donuts");
  console.log(allOrders);
  res.json(allOrders);
});

// Get a specific order
router.get("/api/order/:id", async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params["id"] });
    if (!order) {
      throw new Error(`Order with ID ${req.params["id"]} not found`);
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Order not found" });
  }
});

// Create a specific order
router.post("/api/order/:id", async (req, res) => {
  // To be added
  console.log(`POST /api/${req.params["id"]} - ${JSON.stringify(req.body)}`);
  const orderJson = req.body;
  try {
    const order: IOrder = {
      customer: orderJson.id,
      donuts: orderJson.donuts,
      location: orderJson.ICoord,
      status: orderJson.status,
      orderTime: orderJson.orderTime
    };

    const orderDoc = await new Order(order).save();


    res.sendStatus(200);
  }
  catch (e: unknown) {
    res.sendStatus(400);
  }
});


//
// // Add new donut
// storeRouter.post("/api/store/:name/donut", async (req, res) => {
//   console.log(`POST /api/store/${req.params["name"]}/donut - ${JSON.stringify(req.body)}`);
//
//   const donutJson = req.body;
//
//   try {
//     const store = await Store.findOne({ name: req.params["name"] });
//
//     const donut: IDonut = {
//       id: donutJson.id,
//       title: donutJson.title,
//       description: donutJson.description,
//       price: donutJson.price,
//       calories: donutJson.calories,
//       qty: donutJson.qty,
//       category: donutJson.category,
//       imageURL: donutJson.imageURL,
//     };
//
//     const donutDoc = await new Donut(donut).save();
//
//     store?.donutStock.push(donutDoc._id);
//
//     await store?.save();
//
//     res.sendStatus(200);
//   }
//   catch (e: unknown) {
//     res.sendStatus(400);
//   }
// });


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