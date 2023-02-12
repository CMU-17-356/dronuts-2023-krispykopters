import { Schema, model } from "mongoose";

export interface IDonut {
  price : number,      // Price of the donut
  count : number,      // Count of the donut
  imagePath : string,  // Path to image of the donut
  name : string        // String
}

const DonutSchema = new Schema<IDonut>({
  price: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true,
    min: 0
  },
  imagePath: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

export default DonutSchema;
export const Donut = model<IDonut>("Donut", DonutSchema)