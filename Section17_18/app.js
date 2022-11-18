const http = require("http");

function handleRequest(request, response) {
  // each request will has a url property, which is the part of
  // after the domain and port ... localhost:3000/currenttime -- /currenttime
  if (request.url == "/currenttime") {
    response.statusCode = 200;
    // Date() creates a date object, toisostring makes it a readable string
    response.end("<h1>" + new Date().toISOString() + "</h1>");
  } else if (request.url == "/") {
    response.statusCode = 200; // success
    response.end("<h1>hello world</h1>");
  }
}

// create server wants a function that takes in the request and response parameters
// as it's own parameter because those values will be passed into that function by NodeJS
const server = http.createServer(handleRequest);

console.log("server started on port 3000");

server.listen(3000);
