const app = require("../server");
const request = require("supertest");
const User = require("../models/userSchema");
const bcryptjs = require("bcryptjs");

describe("Login Authentication Tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const hashedPassword = await bcryptjs.hash("testpassword", 10);

    await User.create({
      name: "Test User",
      username: "testuser",
      email: "testuser@mail.com",
      password: hashedPassword,
    });
  });

  it("should return 200 for valid login", async () => {
    const res = await request(app).post("/login").send({
      emailOrUsername: "testuser", // username
      password: "testpassword",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("result", true);
  });

  it("should return 401 for incorrect password", async () => {
    const res = await request(app).post("/login").send({
      emailOrUsername: "testuser",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Incorrect password");
  });

  it("should return 404 for non-existing user", async () => {
    const res = await request(app).post("/login").send({
      emailOrUsername: "nouser",
      password: "whatever",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "User not found");
  });
});
