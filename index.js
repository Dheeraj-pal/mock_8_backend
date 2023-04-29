const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { restaurantRouter } = require("./routes/Restaurant.route");
const { orderRouter } = require("./routes/order.route");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Food Delivery App Backend");
});

app.use("/", userRouter);
app.use("/restaurants", restaurantRouter);
app.use("/orders", orderRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error while connecting to DB", error);
  }
});
