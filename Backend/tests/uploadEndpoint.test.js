const app = require("../server");
const request = require("supertest");
const User = require("../models/userSchema");
const path = require("path");
const mongoose = require("mongoose");

describe("POST /:username/image", () => {
  beforeAll(async () => {
    // Crea un usuario de prueba
    await User.create({
      name: "Test User",
      username: "testUser",
      email: "testuser@mail.com",
      password: "pass",
      image: "",
    });
  });

  it("should upload an image and update the user", async () => {
    const res = await request(app)
      .post("/testUser/image")
      .attach("image", path.join(__dirname, "./image/testImage.png"));
    expect(res.statusCode).toBe(200);
  });

  it("should return 400 if no file is uploaded", async () => {
    const res = await request(app).post("/testUser/image");
    expect(res.statusCode).toBe(400);
  });
});

describe("POST /:username/background", () => {
  beforeAll(async () => {
    await User.create({
      name: "Test User",
      username: "testUserBg",
      email: "testuserbg@mail.com",
      password: "pass",
      imageBackground: "",
    });
  });

  it("should upload a background image and update the user", async () => {
    const res = await request(app)
      .post("/testUserBg/background")
      .attach("image", path.join(__dirname, "./image/testImage.png"));
    expect(res.statusCode).toBe(200);
  });
});
