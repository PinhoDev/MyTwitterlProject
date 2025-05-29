const app = require("../server");
const request = require("supertest");
const User = require("../models/userSchema");

describe("Register Authentication Tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should register a new user successfully", async () => {
    const res = await request(app).post("/register").send({
      name: "Test User",
      username: "testuser",
      email: "testuser@mail.com",
      password: "testpassword", // plain text password
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(true);
  });

  it("should return 400 for missing fields", async () => {
    const res = await request(app).post("/register").send({
      name: "Test User",
      username: "testuser",
      // Missing email and password
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "All fields are required");
  });

  it("should return 409 for duplicate username", async () => {
    await User.create({
      name: "Existing User",
      username: "existinguser",
      email: "existing@mail.com",
      password: "existingpassword",
    });
    const res = await request(app).post("/register").send({
      name: "New User",
      username: "existinguser", // Duplicate username
      email: "newuser@mail.com",
      password: "newpassword",
    });
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty("message", "Username is already taken");
  });
});
