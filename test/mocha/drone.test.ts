import { IDrone, Drone, DroneStatus } from "../../server/db/drone";
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

    let error = null;
    try {
        await new Drone(drone).save();
    } catch (err) {
      error = err;
    }
    expect(error).to.not.equal(null);

    drone.battery = 1.5;

    error = null;
    try {
        await new Drone(drone).save();
    } catch (err) {
      error = err;
    }
    expect(error).to.not.equal(null);
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

    let error = null;
    try {
        await new Drone(drone).save();
    } catch (err) {
      error = err;
    }
    expect(error).to.not.equal(null);
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
    expect(error).to.not.equal(null);
  });
});