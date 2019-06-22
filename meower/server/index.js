const express = require("express");
const cors = require("cors");
const monk = require("monk");

const app = express();

const db = monk("localhost/meower");
const mews = db.get("mews"); // if this collection does not exist it will create it

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Meow"
  });
});

// use joi for validation
function isValidMew(mew) {
  return (
    mew.name &&
    mew.name.toString().trim != "" &&
    mew.content &&
    mew.content.toString().trim != ""
  );
}
app.post("/mews", (req, res) => {
  if (isValidMew(req.body)) {
    const mew = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: new Date()
    };
    // insert into db
    mews.insert(mew).then(createdMew => {
      res.json(createdMew);
    });
  } else {
    res.status(422);
    res.json({
      message: "Name and Content are required!"
    });
  }
});

app.get("/mews", (req, res) => {
  mews.find().then(mews => {
    res.json(mews);
  });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
