import { Schema, Types, model } from "mongoose";
import { ICoord } from "./coord";

/**
 * Drone Status
 */
export enum DroneStatus {
  OutForDelivery = 1,
  ReturningToStore = 2,
  Recharging = 3,
  Idle = 0
}

/**
 * Drone Interface
 */
export interface IDrone {
  name : string,                // UNIQUE, URL-SAFE
  battery : number,             // Battery level 0.0 - 1.0
  location : ICoord,            // Coordinates representing current map coordinates
  status : DroneStatus,         // Possible values: out_for_delivery, returning_to_store, recharging, idle
  order? : Types.ObjectId,      // Reference to Order if out for delivery, else empty
  destination? : Types.ObjectId // Reference to Store if returning to store, else empty
}

/**
 * Drone Schema
 */
const DroneSchema = new Schema<IDrone>({
  name: {
    type: String,
    unique: true,
    required: true
  },
  battery: {
    type: Number,
    required: true,
    min: 0.0,
    max: 1.0
  },
  location: {
    type: Schema.Types.Mixed,
    required: true
  },
  status: {
    type: Number,
    enum: DroneStatus,
    required: true
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: function(this: IDrone) {
      return this.status === DroneStatus.OutForDelivery;
    }
  },
  destination: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: function(this: IDrone) {
      return this.status === DroneStatus.ReturningToStore;
    }
  }
});

export default DroneSchema;

/** Drone Model */
export const Drone = model<IDrone>("Drone", DroneSchema)