import { Schema, Types, model } from "mongoose";
import { ICoord } from "./coord";

/**
 * Order Interface
 */
export interface IOrder {
  customer : Types.ObjectId,  // Reference to Customer
  donuts : [Types.ObjectId],  // List of donuts in order
  location : ICoord,          // Delivery coordinates
  status: string,             // "Placed", "OutForDelivery" or "Delivered"
  drone?: string,             // The Id of the drone for delivery
  orderTime : Date            // Time of order
}

/**
 * Order Schema
 */
const OrderSchema = new Schema<IOrder>({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  donuts: [{
    type: Schema.Types.ObjectId,
    ref: "Donut"
  }],
  location: {
    type: Schema.Types.Mixed,
    required: true
  },
  status: {
    type:Schema.Types.String,
    required: true
  },
  drone: {
    type: Schema.Types.String
  },
  orderTime: {
    type: Schema.Types.Date,
    required: true
  }
});

export default OrderSchema;

/**
 * Order Model
 */
export const Order = model<IOrder>("Order", OrderSchema)