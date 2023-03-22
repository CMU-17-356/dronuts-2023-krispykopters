import { Schema, model } from "mongoose";

/**
 * The Customer Interface
 */
export interface ICustomer {
  username : string,    // UNIQUE, URL-SAFE
  password : string,    // Salted, Hashed Password
  displayName : string  // String
}

/**
 * The Customer Schema
 */
const CustomerSchema = new Schema<ICustomer>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  }
});

export default CustomerSchema;

/** Customer Model */
export const Customer = model<ICustomer>("Customer", CustomerSchema)