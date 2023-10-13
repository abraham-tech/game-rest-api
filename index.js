const express = require("express");
require("dotenv").config();
const router = require("./api/routes");
require("./api/data/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const server = app.listen(process.env.PORT, () => {
  console.log("App is running at port: ", server.address().port);
});
