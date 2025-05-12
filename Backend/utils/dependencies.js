const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  express,
  cors,
  mongoose,
  jwt,
  bcrypt,
};
