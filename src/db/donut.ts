import * as Mongoose from "mongoose";

export interface IDonut {
  price : number,      // Price of the donut
  count : number,      // Count of the donut
  imagePath : string,  // Path to image of the donut
  displayName : string // String
}

const DonutSchema = new Mongoose.Schema<IDonut>({
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
  displayName: {
    type: String,
    required: true
  }
});

export default DonutSchema;
export const Donut = Mongoose.model<IDonut>("Donut", DonutSchema)