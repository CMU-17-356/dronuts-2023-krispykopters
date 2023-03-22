import { Schema, model } from "mongoose";

/**
 * Donut Interface
 */
export interface IDonut {
  // Required
  price : number,         // Price of the donut
  qty : number,           // Quantity
  imageURL : string,      // Path to image of the donut
  title : string,         // String
  id : number,            // Unique
  // Optional
  description? : string,  // The description of the donut
  calories? : string,     // The calories for this donut
  category? : string,     // e.g. Featured, New
}

/**
 * Donut Schema
 */
const DonutSchema = new Schema<IDonut>({
  price: {
    type: Number,
    required: true
  },
  qty: {
    type: Number,
    required: true,
    min: 0
  },
  imageURL: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
  },
  description: String,
  calories: String,
  category: String,
});

export default DonutSchema;

/** Donut Model */
export const Donut = model<IDonut>("Donut", DonutSchema)