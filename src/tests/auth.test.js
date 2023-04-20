const request = require("supertest");
const { server } = require("../index");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const User = require("../model/User");
dotenv.config();

const MONGO_DB = process.env.MONGO_DB;

const user = {
  username: "testuser2",
  password: "testpassword",
};

beforeAll(async () => {
  await mongoose.connect(MONGO_DB);
});

afterAll(async () => {
  await User.deleteMany({ username: user.username });
  await mongoose.disconnect();
});

describe("GET /api/auth/auth", () => {
  test("Should return 201 if user was created", async () => {
    const response = await request(server)
      .post("/api/auth/register")
      .send(user);
    expect(response.status).toBe(201);
  });

  it("should respond with a cookie and a token", async () => {
    const authToken = await request(server).post("/api/auth/login").send(user);
    const { token } = authToken.body;


    const response = await request(server)
      .get("/api/auth/auth")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should respond with an error if token is not provided", async () => {
    const response = await request(server).get("/api/auth/auth");
    expect(response.status).toBe(401);
  });
});
