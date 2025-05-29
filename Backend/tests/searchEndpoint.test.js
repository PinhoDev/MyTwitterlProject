const app = require("../server");
const request = require("supertest");
const User = require("../models/userSchema");
const Tweet = require("../models/tweetSchema");

describe("Search Endpoint Tests", () => {
  let user;

  beforeEach(async () => {
    await User.deleteMany({});
    await Tweet.deleteMany({});

    user = await User.create({
      name: "alice",
      username: "alicewonder",
      email: "alice@mail.com",
      profilePicture: "alice.jpg",
      password: "password",
    });

    await Tweet.create({
      content: "Loving #NodeJS and #MongoDB!",
      hashtags: ["NodeJS", "MongoDB", "alicewonder"],
      createdAt: new Date(),
      author: user._id,
    });
  });

  it("should search for users and tweets by username and hashtags", async () => {
    const res = await request(app).get("/search/alicewonder");
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
    expect(res.body.users).toHaveLength(1);
    expect(res.body.tweets).toHaveLength(1);
  });
});
