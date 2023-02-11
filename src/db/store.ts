import { Schema, Types, model } from "mongoose";
import { ICoord } from "./coord";

export interface IStore {
  name : string,                  // UNIQUE, URL-SAFE
  password : string,              // Salted, Hashed Password
  location : ICoord,              // Custom type representing store map coordinates
  droneCapacity : number,         // Number of drones that can be hosted at this location
  donutStock : [Types.ObjectId], // List of donuts in stock
  bankAccount : string            // Meta data for receiving payments from customers, format depends on third party API
}

const StoreSchema = new Schema<IStore>({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: Schema.Types.Mixed,
    required: true
  },
  droneCapacity: {
    type: Number,
    required: true,
    min: 0
  },
  donutStock: [{
    type: Schema.Types.ObjectId,
    ref: "Donut"
  }],
  bankAccount: {
    type: String,
    required: true
  },
});

export default StoreSchema;
export const Store = model<IStore>("Store", StoreSchema)