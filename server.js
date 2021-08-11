const express = require("express");
const mongoose = require("mongoose");
const port = 4400;
const app = express();
const url_Local = "mongodb://localhost/StudentApi";
const URL =
  "mongodb+srv://gZOFHhVBWYypd25Z:gZOFHhVBWYypd25Z@cluster0.uzqil.mongodb.net/myStoreDB?retryWrites=true&w=majority";
const cors = require("cors");
const path = require("../BackSide/Router");

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database has been successfully connected");
  })
  .catch(() => {
    console.log("error while trying to connect to the database");
  });
app.use(express.json());
app.use(cors());
app.use("/student/api", path);

app.listen(port, () => {
  console.log(`server is currently running on port: ${port}`);
});
