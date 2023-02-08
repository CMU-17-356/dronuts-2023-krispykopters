import mongoose from 'mongoose';
import { ICustomer, Customer } from "../../src/db/customer";
import { expect } from "chai";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { before, after } from "mocha";

let mongoServer: MongoMemoryServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("customer", () => {
  it("should create a new customer", () => {
    const customer: ICustomer = {
      username: "username",
      password: "password",
      displayName: "A User"
    };

    return new Customer(customer).save().then(result => {
      expect(result.username).to.equal(customer.username);
      expect(result.password).to.equal(customer.password);
      expect(result.displayName).to.equal(customer.displayName);
    })
  });
});