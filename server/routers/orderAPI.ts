import { Order, IOrder } from "../db/order";
import express from "express";

const router = express();

// Get all orders
router.get("/", async (req, res) => {
  const allOrders = await Order.find();
  console.log(allOrders);
  res.json(allOrders);
});

// Get a specific order
router.get("/orderId", async (req, res) => {
  // To be added
  console.log("Get a specific order");
});

// Create a specific order
router.post("/orderId", async (req, res) => {
  // To be added
  console.log("Create a specific order");
});

// Update a specific order
router.put("/orderId", async (req, res) => {
  // To be added
  console.log("Update a specific order");
});

// Delete a specific order
router.delete("/orderId", async (req, res) => {
  // To be added
  console.log("Delete a specific order");
});

export { router as orderRouter };