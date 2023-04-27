require('dotenv').config({path: './src/.env'});
const request = require('supertest');
const {server} = require('../index');
const mongoose = require('mongoose');
const Post = require('../model/Post');
const User = require('../model/User');
const MONGO_DB = process.env.MONGO_DB


const posts = {
    title: "hello",
    text: "something"
}

const user = {
    username: "testinguser10",
    password: "testinguser10",
};


beforeAll(async () => {
    await mongoose.connect(MONGO_DB);
});

afterAll(async () => {

    await Post.deleteMany({posts});
    await User.deleteMany({username: user.username});
    await mongoose.disconnect();
});
test("Should return 201 if user was created", async () => {
    const response = await request(server)
        .post("/api/auth/register")
        .send(user);
    expect(response.status).toBe(201);
});


it("should respond all posts", async () => {
    const authToken = await request(server).post("/api/auth/login").send(user);
    const {token} = authToken.body;


    const response = await request(server)
        .get("/api/posts")
        .set("Authorization",`Bearer ${token}`)
    expect(response.status).toBe(200);


});

it("should create a post", async () => {
    const authToken = await request(server).post("/api/auth/login").send(user);
    const {token} = authToken.body;


    const response = await request(server)
        .post("/api/posts/create")
        .set("Authorization",`Bearer ${token}`)
        .send(posts)
    expect(response.status).toBe(201);


});
