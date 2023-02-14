import { IDonut, Donut } from "../../src/db/donut";
import { expect } from "chai";

describe("donut", () => {
  it("should create a new donut", () => {
    const donut: IDonut = {
      price: 1.99,
      count: 0,
      imagePath: "./path/to/image",
      name: "Plain"
    };

    return new Donut(donut).save().then(result => {
      expect(result.price).to.equal(donut.price);
      expect(result.imagePath).to.equal(donut.imagePath);
      expect(result.name).to.equal(donut.name);
    })
  });

  it("should reject negative count", async () => {
    const donut: IDonut = {
      price: 1.99,
      count: -1,
      imagePath: "./path/to/image",
      name: "Plain"
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