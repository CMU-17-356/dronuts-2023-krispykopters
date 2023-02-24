import { Schema, model } from "mongoose";

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
export const Donut = model<IDonut>("Donut", DonutSchema)