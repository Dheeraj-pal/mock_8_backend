const express = require("express");
const { RestaurantModel } = require("../models/Restaurant.model");
const restaurantRouter = express.Router();

restaurantRouter.get("/", async (req, res) => {
  try {
    const Restaurants = await RestaurantModel.find();
    res.send(Restaurants);
  } catch (error) {
    console.log(
      "Error occurred while getting all the available restaurants list",
      error
    );
    res.send("Error occurred while getting all the available restaurants list");
  }
});

restaurantRouter.get("/:id", async (req, res) => {
  const ID = req.params.id;

  try {
    const Restaurant = await RestaurantModel.find({ _id: ID });
    res.send(Restaurant);
  } catch (error) {
    console.log("Error while finding the particular Restaurant", error);
    res.send("Error while finding the particular Restaurant");
  }
});

restaurantRouter.get("/:id/menu", async (req, res) => {
  const ID = req.params.id;

  try {
    const Restaurant = await RestaurantModel.find({ _id: ID });
    const menu = Restaurant[0]?.menu;
    console.log(menu);
    res.send(menu);
  } catch (error) {
    console.log("Error while finding the menu of particular Restaurant", error);
    res.send("Error while finding the menu of particular Restaurant");
  }
});

restaurantRouter.post("/restaurant", async (req, res) => {
  const { name, address, menu } = req.body;

  try {
    const restaurant = new RestaurantModel({ name, address, menu });
    await restaurant.save();
    res.send({ msg: "New Restaurant added successfully", restaurant });
  } catch (error) {
    console.log("Error while adding new Restaurant", error);
    res.send("Error while adding new Restaurant");
  }
});

restaurantRouter.post("/restaurant/:id/menu", async (req, res) => {
  const ID = req.params.id;

  try {
    const restaurant = await RestaurantModel.findById(ID);

    if (!restaurant) {
      res.status(404).send({ msg: "Restaurant not found" });
    }

    const newMenu = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    };

    restaurant.menu.push(newMenu);
    const updatedRestaurant = await restaurant.save();

    res.send({ msg: "New Menu added", updatedRestaurant });
  } catch (error) {
    console.log("Error while adding new MENU details", error);
    res.send("Error while adding new MENU details");
  }
});

restaurantRouter.delete("/restaurant/:resID/menu/:menuID", async (req, res) => {
  const RestaurantID = req.params.resID;
  const menuID = req.params.menuID;

  try {
    const restaurant = await RestaurantModel.findById(RestaurantID);
    if (!restaurant) {
      res.send("Restaurant Not Found");
    }

    const menu = restaurant.menu.findById(menuID);

    if (!menu) {
      res.send("Menu item Not Found");
    }

    menu.remove();

    const updatedRestaurant = await restaurant.save();
    res.send({ msg: "Menu deleted successfully", updatedRestaurant });
  } catch (error) {
    console.log("Error while deleting the menu", error);
    res.send("Error while deleting the menu");
  }
});

module.exports = {
  restaurantRouter,
};
