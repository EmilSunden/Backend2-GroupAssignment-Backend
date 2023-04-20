const request = require("supertest");
const { server } = require("../index");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../model/User");
dotenv.config();

const MONGO_DB = process.env.MONGO_DB;

const user = {
  username: "testuser",
  password: "testpassword",
};

beforeAll(async () => {
  await mongoose.connect(MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
});

afterAll(async () => {
  await User.deleteMany({ username: user.username });
  await mongoose.disconnect();
});

describe("POST /api/follow", () => {
  test("Should return 201 if user was created", async () => {
    const response = await request(server)
      .post("/api/auth/register")
      .send(user);
    expect(response.status).toBe(201);
  });

  it("should require authentication", async () => {
    const response = await request(server).post("/api/auth/follow").send({
      followingId: "643d5591e859d8b88af6c70b",
    });

    expect(response.status).toBe(401);
  });

  it("should allow authenticated users to follow other users", async () => {
    // Login to get a valid token
    const authToken = await request(server).post("/api/auth/login").send(user);
    let token;
    token = authToken.body.token;

    const response = await request(server)
      .post("/api/auth/follow")
      .set("Authorization", `Bearer ${token}`)
      .send({
        followingId: "643d520012573c3836dc22a5",
      });

    expect(response.status).toBe(200);
  });
});
