const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
require("dotenv").config();
const userRouter = express.Router();
const KEY = process.env.KEY;

userRouter.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, secure_pass) => {
      if (err) {
        console.log("Error while Hashing the password", err);
      } else {
        const user = new UserModel({
          name,
          email,
          password: secure_pass,
          address,
        });
        await user.save();
        res.send("User Registered Successful");
      }
    });
  } catch (error) {
    console.log("Error while registering the user", error);
    res.send("Error while registering the user");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });
    const hashed_pass = user[0]?.password;

    if (user.length > 0) {
      bcrypt.compare(password, hashed_pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              userID: user[0]._id,
            },
            KEY
          );
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send("Incorrect Password");
        }
      });
    } else {
      res.send("Incorrect Email ID");
    }
  } catch (error) {
    console.log("Error occurred while LOGIN", error);
    res.send("Error occurred while LOGIN");
  }
});

userRouter.patch("/user/:id/reset", async (req, res) => {
  const ID = req.params.id;

  const { oldPassword, newPassword } = req.body;

  try {
    const user = await UserModel.find({ _id: ID });
    const hashed_pass = user[0].password;

    if (user.length > 0) {
      bcrypt.compare(oldPassword, hashed_pass, (err, result) => {
        if (result) {
          bcrypt.hash(newPassword, 5, async (err, secure_pass) => {
            if (err) {
              console.log("Error while hashing the Password");
              res.send("Error while hashing the password");
            } else {
              await UserModel.findByIdAndUpdate(
                { _id: ID },
                { password: secure_pass }
              );
              res.send({ msg: `Password updated with id ${ID} Successfully` });
            }
          });
        } else {
          console.log("Incorrect Password");
          res.send("Incorrect Password");
        }
      });
    } else {
      console.log("No User Found Check your ID");
      res.send("No User Found");
    }
  } catch (error) {
    console.log("Error while Reseting the Password", error);
    res.send("Error while Reseting the Password");
  }
});

module.exports = {
  userRouter,
};
