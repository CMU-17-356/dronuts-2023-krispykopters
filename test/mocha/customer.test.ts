import { ICustomer, Customer } from "../../src/db/customer";
import { expect } from "chai";

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