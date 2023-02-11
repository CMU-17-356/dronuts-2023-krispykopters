import { IDonut, Donut } from "../../src/db/donut";
import { expect } from "chai";

describe("donut", () => {
  it("should create a new donut", () => {
    const donut: IDonut = {
      price: 1.99,
      count: 1,
      imagePath: "./path/to/image",
      displayName: "Plain"
    };

    return new Donut(donut).save().then(result => {
      expect(result.price).to.equal(donut.price);
      expect(result.imagePath).to.equal(donut.imagePath);
      expect(result.displayName).to.equal(donut.displayName);
    })
  });
  it("should reject negative count", () => {
    const donut: IDonut = {
      price: 1.99,
      count: -1,
      imagePath: "./path/to/image",
      displayName: "Plain"
    };

    try {
      new Donut(donut).save();
    } catch (err) {
      expect(err).to.be.not.null;
    }
  });
});