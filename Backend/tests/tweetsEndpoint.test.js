const app = require("../server");
const request = require("supertest");
const User = require("../models/userSchema");
const Tweet = require("../models/tweetSchema");

describe("Create a Tweet by user", () => {
  let user;

  beforeEach(async () => {
    await User.deleteMany({});
    await Tweet.deleteMany({});
    user = await User.create({
      name: "Test User",
      username: "testuser",
      email: "testuser@mail.com",
      password: "password",
      tweets: [],
    });
  });

  it("should create a new tweet for a valid user", async () => {
    const res = await request(app)
      .post("/testuser/tweet")
      .send({
        content: "Hello world!",
        hashtags: ["hello", "world"],
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(true);

    const tweets = await Tweet.find({ author: user._id });
    expect(tweets.length).toBe(1);
    expect(tweets[0].content).toBe("Hello world!");
  });
});

describe("Add a comment to a tweet", () => {
  let user;
  let tweet;

  beforeEach(async () => {
    await User.deleteMany({});
    await Tweet.deleteMany({});
    user = await User.create({
      name: "Test User",
      username: "testuser",
      email: "testuser@mail.com",
      password: "password",
      tweets: [],
    });
  });
  it("should add a comment to a tweet", async () => {
    tweet = await Tweet.create({
      content: "This is a test tweet",
      hashtags: ["test"],
      createdAt: new Date(),
      author: user._id,
    });

    const res = await request(app).post(`/testuser/tweet/comment`).send({
      tweetId: tweet._id,
      content: "This is a test comment",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(true);

    const updatedTweet = await Tweet.findById(tweet._id);
    expect(updatedTweet.comments.length).toBe(1);
    expect(updatedTweet.comments[0].content).toBe("This is a test comment");
  });
});
