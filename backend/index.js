const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/Users");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.post("/createUser", (req, res) => {
  User.create(req.body)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/getUser/:id", (req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/updateUser/:id", (req, res) => {
    const {id} = req.params;
    User.findByIdAndUpdate(id, req.body)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
})

app.delete("/deleteUser/:id", (req, res) => {
    const {id} = req.params;
    User.findByIdAndDelete(id)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
})

app.listen(5000, () => console.log("Server Running"));
