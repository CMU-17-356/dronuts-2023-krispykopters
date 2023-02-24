import { IDonut, Donut } from "../../server/db/donut";
import { expect } from "chai";

describe("donut", () => {
  it("should create a new donut", () => {
    const donut: IDonut = {
      id: 1,
      price: 1.99,
      qty: 0,
      imageURL: "./path/to/image",
      title: "Plain"
    };

    return new Donut(donut).save().then(result => {
      expect(result.price).to.equal(donut.price);
      expect(result.imageURL).to.equal(donut.imageURL);
      expect(result.title).to.equal(donut.title);
    })
  });

  it("should reject negative count", async () => {
    const donut: IDonut = {
      id: 2,
      price: 1.99,
      qty: -1,
      imageURL: "./path/to/image",
      title: "Plain"
    };

    let error = null;
    try {
      await new Donut(donut).save();
    } catch (err) {
      error = err;
    }
    expect(error).to.not.equal(null);
  });
});