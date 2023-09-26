require("./database");
require("dotenv").config();
const express = require("express");
const { routes } = require("./routes");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);

server.listen("http://localhost:8080", () => {
  console.log("Server started at localhost:8080");
});
