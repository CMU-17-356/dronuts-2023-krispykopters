import { Schema, model } from "mongoose";

export interface ICustomer {
  username : string,    // UNIQUE, URL-SAFE
  password : string,    // Salted, Hashed Password
  displayName : string  // String
}

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
export const Customer = model<ICustomer>("Customer", CustomerSchema)