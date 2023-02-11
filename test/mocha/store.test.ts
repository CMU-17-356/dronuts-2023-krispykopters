import { IDonut, Donut } from "../../src/db/donut";
import { IStore, Store } from "../../src/db/store";
import { expect } from "chai";

describe("store", () => {
  it("should create a new order", async () => {
    const donut: IDonut = {
      price: 1.99,
      count: 1,
      imagePath: "./path/to/image",
      displayName: "Plain"
    };
    const donutDoc = await new Donut(donut).save();

    const store: IStore = {
      name: "Store1",
      password: "password",
      location: {
        lat: 1.0,
        long: 1.0
      },
      droneCapacity: 3,
      donutStock: [donutDoc._id],
      bankAccount: "account info",
    };
    const storeDoc = await new Store(store).save();

    expect(storeDoc.name).to.equal(store.name);
    expect(storeDoc.password).to.equal(store.password);
    expect(storeDoc.location).to.equal(store.location);
    expect(storeDoc.droneCapacity).to.equal(store.droneCapacity);
    expect(storeDoc.donutStock).to.have.same.members(store.donutStock);
    expect(storeDoc.bankAccount).to.equal(store.bankAccount);
  });

  it("should reject negative drone capacity", async () => {
    const donut: IDonut = {
      price: 1.99,
      count: 1,
      imagePath: "./path/to/image",
      displayName: "Plain"
    };
    const donutDoc = await new Donut(donut).save();

    const store: IStore = {
      name: "Store1",
      password: "password",
      location: {
        lat: 1.0,
        long: 1.0
      },
      droneCapacity: -1,
      donutStock: [donutDoc._id],
      bankAccount: "account info",
    };

    try {
      await new Store(store).save();
    } catch (err) {
      expect(err).to.be.not.null;
    }
  });
});