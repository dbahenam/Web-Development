const express = require("express");
const resData = require("../util/restaurant-data");
const uuid = require("uuid");
const router = express.Router();

router.get("/restaurants", function (req, res) {
  let order = req.query.order; // get query settings
  let nextOrder = "desc";
  console.log(nextOrder);
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  if (order == "desc") {
    nextOrder = "asc";
  }
  const storedRestaurants = resData.getStoredRestaurants();

  // sort alphabetically
  storedRestaurants.sort(function (resA, resB) {
    if (order === "asc" && resA.name > resB.name) {
      return 1;
    } else if (order === "desc" && resB.name > resA.name) {
      return 1;
    } else {
      return -1;
    }
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

// dynamic route (:id can be anything you want)
router.get("/restaurants/:id", function (req, res) {
  const restaurantID = req.params.id;

  const storedRestaurants = resData.getStoredRestaurants();

  for (restaurant of storedRestaurants) {
    if (restaurant.id === restaurantID) {
      // return stops function execution, first restaurant is key in restaurant-detail template
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }
  res.status(404).render("404");
  // res.render("restaurant-detail", { rid: restaurantID }); // rid is key we make
  // // rid will be available in restaurant-detail.ejs
  // // also make sure to make paths absolute for stylesheets / scripts
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  // working with incoming data
  // const restaurantName = req.body.name;
  const restaurant = req.body;
  const storedRestaurants = resData.getStoredRestaurants();
  // accessing a property(id here) from the restaurant object that doesn't exist
  // and assigning it a value(allowed in javascript, js will create the property)
  //console.log(uuid.v4());

  restaurant.id = uuid.v4(); // v4 gives unique id (in string)

  storedRestaurants.push(restaurant);

  resData.storeRestaurants(storedRestaurants);

  // tell browser to switch to a different page
  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
