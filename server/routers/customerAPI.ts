import { Customer, ICustomer } from "../db/customer";
import express from "express";

// Create the router
const router = express();

// Get all customers
router.get("/api/customers", async (req, res) => {
  const allCustomer = await Customer.find();
  console.log(allCustomer);
  res.json(allCustomer);
});

// Get a specific customer
router.get("/api/customer/:id", async (req, res) => {
  // To be added
  console.log("Get a specific customer");
});

// Create a specific customer
router.post("/api/customer/:id", async (req, res) => {
  // To be added
  console.log("Create a specific customer");
});

// Update a specific customer
router.put("/api/customer/:id", async (req, res) => {
    // To be added
    console.log("Update a specific customer");
  });

// Delete a specific customer
router.delete("/api/customer/:id", async (req, res) => {
  // To be added
  console.log("Delete a specific customer");
});

export { router as customerRouter };