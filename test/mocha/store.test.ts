import { IDonut, Donut } from "../../server/db/donut";
import { IStore, Store } from "../../server/db/store";
import { expect } from "chai";

describe("store", () => {
  it("should create a new store", async () => {
    const donut: IDonut = {
      price: 1.99,
      qty: 1,
      imagePath: "./path/to/image",
      name: "Plain"
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
      qty: 1,
      imagePath: "./path/to/image",
      name: "Plain"
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

    let error = null;
    try {
      await new Store(store).save();
    } catch (err) {
      error = err;
    }
    expect(error).to.not.equal(null);
  });
});