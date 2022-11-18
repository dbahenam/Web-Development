const fs = require("fs"); // standard file system package

// allows us to construct complete paths that will
//work on all operating systems
const path = require("path");

// express is a function
const express = require("express");

// object
const app = express();

// use allows us to handle incoming requests, doesn't care about the kind of request
// that it gets. You pass in an extra handler that will be used on all incoming request
//urlencoded is a handler that parses incoming data and translates it to a javascript object
// such handlers are called middleware handlers, between express seing that request
// and our code handling that request
app.use(express.urlencoded({ extended: false }));

// allows us to define request handler for 'get' requests
// second parameter is an anonymous function,
app.get("/currenttime", function (req, res) {
  // like end
  res.send("<h1>" + new Date().toISOString() + "</h1>");
}); // localhost:3000/currenttime

app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>");
}); // localhost:3000/

app.get("/form", function (req, res) {
  // sending data from the browser to the server if the server should store that data
  // should use POST method
  res.send(
    '<form action="/store-user" method="POST"><label>Your Name:</label><input type="text" name="username"><button>Submit</button></form>'
  );
});

app.post("/store-user", function (req, res) {
  // get access to data by keys set with name attribute
  const userName = req.body.username;
  console.log(userName);
  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath); // read the file data(raw text)
  const existingUsers = JSON.parse(fileData); // create javascript object from fileData (array)
  existingUsers.push(userName); // push appends new item into array

  //convert new data to raw text and write to file
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send("<h1> Username stored!</h1>");
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath); // read file as raw data
  const existingUsers = JSON.parse(fileData); // create js object from fileData

  let usersStr = "<ol>";
  //   for (let i = 0; i < existingUsers.length; i++) {
  //     usersStr += "<li>" + existingUsers[i] + "</li>";
  //   }
  for (const user of existingUsers) {
    usersStr += "<li>" + user + "</li>";
  }
  usersStr += "</ol>";

  res.send(usersStr);
});
app.listen(3000); // creates server for us in specified port
