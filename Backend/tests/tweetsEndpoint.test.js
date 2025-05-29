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

describe("GET /tweets", () => {
  let user, tweet;

  beforeEach(async () => {
    await User.deleteMany({});
    await Tweet.deleteMany({});

    user = await User.create({
      name: "Test User",
      username: "testuser",
      email: "testuser@mail.com",
      password: "password",
    });

    tweet = await Tweet.create({
      content: "Hello world!",
      author: user._id,
      comments: [
        {
          content: "Nice tweet!",
          userName: user._id,
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    });
  });

  it("should return all tweets with author and comments populated", async () => {
    const res = await request(app).get("/tweets");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("result", true);

    const tweetRes = res.body.tweets[0];
    expect(tweetRes).toHaveProperty("content", "Hello world!");
    expect(tweetRes.author).toHaveProperty("username", "testuser");
    expect(tweetRes.comments[0]).toHaveProperty("content", "Nice tweet!");
    expect(tweetRes.comments[0].userName).toHaveProperty(
      "username",
      "testuser"
    );
  });

  it("should return an error if something goes wrong", async () => {
    jest.spyOn(Tweet, "find").mockImplementation(() => {
      throw new Error("Database error");
    });

    const res = await request(app).get("/tweets");
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("result", false);
  });
});
