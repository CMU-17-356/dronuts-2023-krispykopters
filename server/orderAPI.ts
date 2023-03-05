import { app } from "./index";
import { Order, IOrder } from "./db/order";

// Get all orders
app.get("/api/orders", async (req, res) => {
  const allOrders = await Order.find().populate("customer").populate("donuts");
  console.log(allOrders);
  res.json(allOrders);
});
