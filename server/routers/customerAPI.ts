import { Customer, ICustomer } from "../db/customer";
import express from "express";

// Create the router
const router = express();

// Get all customers
router.get("/", async (req, res) => {
  const allCustomer = await Customer.find();
  console.log(allCustomer);
  res.json(allCustomer);
});

// Get a specific customer
router.get("/customerId", async (req, res) => {
  // To be added
  console.log("Get a specific customer");
});

// Create a specific customer
router.post("/customerId", async (req, res) => {
  // To be added
  console.log("Create a specific customer");
});

// Update a specific customer
router.put("/customerId", async (req, res) => {
    // To be added
    console.log("Update a specific customer");
  });

// Delete a specific customer
router.delete("/customerId", async (req, res) => {
  // To be added
  console.log("Delete a specific customer");
});

export { router as customerRouter };