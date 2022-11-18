const path = require("path");
const filePath = path.join(__dirname, "..", "data", "restaurants.json");
const fs = require("fs");
const { some } = require("async");

function getStoredRestaurants() {
  // get javascript object from restaurantID
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

// making it requirable
module.exports = {
  //key : value
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
};
