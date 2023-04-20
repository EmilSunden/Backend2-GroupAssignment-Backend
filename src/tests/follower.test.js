const request = require("supertest");
const { server } = require("../index");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../model/User");
dotenv.config();

const MONGO_DB = process.env.MONGO_DB;

const user = {
  username: "testuser3",
  password: "testpassword",
};

let id;

beforeAll(async () => {
  await mongoose.connect(MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const insertedUser = await request(server).post('/api/auth/register').send(user);
  id = insertedUser.body.insertedId;
});

afterAll(async () => {
  await User.deleteMany({ username: user.username });
  await mongoose.disconnect();
});

describe("POST /api/follow", () => {
  it("should require authentication", async () => {
    const response = await request(server).post("/api/follow").send();

    expect(response.status).toBe(401);
  });

  it("should allow authenticated users to follow other users", async () => {
    // Login to get a valid token
    const loginResponse = await request(server).post("/api/auth/login").send(user);
    expect(loginResponse.status).toBe(200);

    const token = loginResponse.body.token;
    const response = await request(server)
      .post("/api/follow")
      .set("Authorization", `Bearer ${token}`)
      .send({
        followingId: id,
      });

    expect(response.status).toBe(200);
  });
});
