const express = require("express");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  express,
  router,
  cors,
  mongoose,
  jwt,
  bcrypt,
};
