import { IDonut, Donut } from "../../server/db/donut";
import { ICustomer, Customer } from "../../server/db/customer";
import { IOrder, Order } from "../../server/db/order";
import { expect } from "chai";

describe("order", () => {
  it("should create a new order", async () => {
    const donut: IDonut = {
      price: 1.99,
      qty: 1,
      imagePath: "./path/to/image",
      name: "Plain"
    };
    const donutDoc = await new Donut(donut).save();

    const customer: ICustomer = {
      username: "username",
      password: "password",
      displayName: "A User"
    };
    const customerDoc = await new Customer(customer).save();

    const order: IOrder = {
      customer: customerDoc._id,
      donuts: [donutDoc._id],
      location: {
        lat: 1.0,
        long: 1.0
      },
      orderTime: new Date(Date.now())
    };
    const orderDoc = await new Order(order).save();

    expect(orderDoc.customer).to.equal(customerDoc._id);
    expect(orderDoc.donuts).to.have.same.members(order.donuts);
    expect(orderDoc.location).to.equal(order.location);
    expect(orderDoc.orderTime).to.equal(order.orderTime);
  });
});