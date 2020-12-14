const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var router = require("express").Router();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

require("./routes/signup.routes")(app);

app.get("/", (req, res) => {
  res.json({ 
    message: "Signup service is working..."
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/.`);
});