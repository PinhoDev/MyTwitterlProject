const app = require("../server");
const request = require("supertest");
const User = require("../models/userSchema");
const Tweet = require("../models/tweetSchema");
const mongoose = require("mongoose");

describe("GET /home/:username", () => {
  let userA, userB, tweet1, tweet2;

  beforeEach(async () => {
    await User.deleteMany({});
    await Tweet.deleteMany({});

    // Create the main user (userA)
    userA = await User.create({
      name: "User A",
      username: "usera",
      email: "usera@mail.com",
      password: "hashedpassword",
      image: "usera.png",
      following: [],
    });

    // Create a followed user (userB)
    userB = await User.create({
      name: "User B",
      username: "userb",
      email: "userb@mail.com",
      password: "hashedpassword",
      image: "userb.png",
      following: [],
    });

    // Add userB to userA's following list
    userA.following.push(userB._id);
    await userA.save();

    // Create tweets for both users
    tweet1 = await Tweet.create({
      content: "Tweet by userA",
      author: userA._id,
      createdAt: new Date(),
    });

    tweet2 = await Tweet.create({
      content: "Tweet by userB",
      author: userB._id,
      createdAt: new Date(Date.now() - 1000),
    });
  });

  it("should return tweets from the user and followed users", async () => {
    const res = await request(app).get(`/home/${userA.username}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("result", true);

    // Check if tweets are sorted correctly (latest first)
    expect(res.body.homeTweets[0].content).toBe("Tweet by userA");
    expect(res.body.homeTweets[1].content).toBe("Tweet by userB");
  });

  it("should return 404 if user is not found", async () => {
    const res = await request(app).get("/home/nonexistentuser");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "User not found");
  });
});

describe("GET /profile/:username", () => {
  let user;

  beforeEach(async () => {
    await User.deleteMany({});
    user = await User.create({
      name: "User B",
      username: "userb",
      email: "userb@mail.com",
      password: "hashedpassword",
      image: "userb.png",
      following: [],
    });
    await user.save();
  });

  it("should return user details and tweets", async () => {
    const res = await request(app).get(`/profile/${user.username}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("result", true);
  });

  it("should return 404 if user is not found", async () => {
    const res = await request(app).get("/profile/nonexistentuser");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "User not found");
  });
});

describe("POST /:username/following", () => {
  let userA, userB;

  beforeEach(async () => {
    await User.deleteMany({});

    userA = await User.create({
      name: "User A",
      username: "usera",
      email: "usera@mail.com",
      password: "pass",
      followers: [],
      following: [],
    });

    userB = await User.create({
      name: "User B",
      username: "userb",
      email: "userb@mail.com",
      password: "pass",
      followers: [],
      following: [],
    });
  });

  it("should allow userA to follow userB", async () => {
    const res = await request(app)
      .post(`/usera/following`)
      .send({ following: "userb" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("result", true);

    // Check database state
    const updatedUserA = await User.findOne({ username: "usera" });
    const updatedUserB = await User.findOne({ username: "userb" });

    expect(updatedUserA.following).toContainEqual(updatedUserB._id);
    expect(updatedUserB.followers).toContainEqual(updatedUserA._id);
  });

  it("should allow userA to unfollow userB", async () => {
    // First, userA follows userB
    await request(app).post(`/usera/following`).send({ following: "userb" });

    // Then, userA unfollows userB
    const res = await request(app)
      .post(`/usera/following`)
      .send({ following: "userb" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("result", true);

    // Check database state
    const updatedUserA = await User.findOne({ username: "usera" });
    const updatedUserB = await User.findOne({ username: "userb" });

    expect(updatedUserA.following).not.toContainEqual(updatedUserB._id);
    expect(updatedUserB.followers).not.toContainEqual(updatedUserA._id);
  });
});
