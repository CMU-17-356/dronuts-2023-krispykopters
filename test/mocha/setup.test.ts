import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { before, after } from "mocha";

let mongoServer: MongoMemoryServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  mongoose.set("strictQuery", false);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
      await collection.deleteMany({});
  }
});
