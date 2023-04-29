const express = require("express");
const { OrderModel } = require("../models/order.model");
const orderRouter = express.Router();

orderRouter.post("/order", async (req, res) => {
  const { user, restaurant, items, totalPrice, deliveryAddress, status } =
    req.body;

  try {
    const order = new OrderModel({
      user,
      restaurant,
      items,
      totalPrice,
      deliveryAddress,
      status,
    });
    await order.save();
    res.send({ msg: "New order Placed", order });
  } catch (error) {
    console.log("Error while placing the order", error);
    res.send("Error while placing the order");
  }
});

orderRouter.get("/order/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const order = await OrderModel.find({ _id: ID });
    console.log(order);
    res.send(order);
  } catch (error) {
    console.log("Error while getting the order", error);
    res.send("Error while getting the order");
  }
});

orderRouter.put("/order/:id", async (req, res) => {
  const ID = req.params.id;
  const playlod = req.body;

  try {
    const order = await OrderModel.findByIdAndUpdate(ID, { status: playlod });
    res.send("Successful", order);
  } catch (error) {
    console.log("Error while updating", error);
    res.send("Error while updating");
  }
});

module.exports = {
  orderRouter,
};
