const express = require("express");

const routes = require("./data/routers");
const allMiddleware = require("./data/middleware");

const server = express();

allMiddleware(server);

server.use("/api", routes);

server.get("/", (req, res) => {
  if (req.session.seenBefore) {
    res.json("Welcome back");
  } else {
    req.session.seenBefore = true;
    res.json("Welcome!");
  }
});

module.exports = server;