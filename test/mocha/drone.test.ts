import { IDrone, Drone, DroneStatus } from "../../src/db/drone";
import { expect } from "chai";

describe("drone", () => {
  it("should create a new drone", async () => {
    const drone: IDrone = {
      name: "Drone 1",
      battery: 0.5,
      location: {
        lat: 1.0,
        long: 1.0
      },
      status: DroneStatus.Recharging
    };
    const droneDoc = await new Drone(drone).save();

    expect(droneDoc.name).to.equal(drone.name);
    expect(droneDoc.battery).to.equal(drone.battery);
    expect(droneDoc.location).to.equal(drone.location);
    expect(droneDoc.status).to.equal(drone.status);
  });

  it("should reject invalid battery", async () => {
    const drone: IDrone = {
      name: "Drone 1",
      battery: -0.5,
      location: {
        lat: 1.0,
        long: 1.0
      },
      status: DroneStatus.Recharging
    };

    try {
        await new Drone(drone).save();
    } catch (err) {
      expect(err).to.be.not.null;
    }

    drone.battery = 1.5;

    try {
        await new Drone(drone).save();
    } catch (err) {
      expect(err).to.be.not.null;
    }
  });

  it("should require order if out for delivery", async () => {
    const drone: IDrone = {
      name: "Drone 1",
      battery: 0.5,
      location: {
        lat: 1.0,
        long: 1.0
      },
      status: DroneStatus.OutForDelivery
    };

    try {
        await new Drone(drone).save();
    } catch (err) {
      expect(err).to.be.not.null;
    }
  });

  it("should require destination if returning to store", async () => {
    const drone: IDrone = {
      name: "Drone 1",
      battery: 0.5,
      location: {
        lat: 1.0,
        long: 1.0
      },
      status: DroneStatus.ReturningToStore
    };

    let error = null;
    try {
        await new Drone(drone).save();
    } catch (err) {
      error = err;
    }
    expect(error).to.be.not.null;
  });
});