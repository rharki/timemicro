var express = require('express');
var http = require('http');

var app = express();
var PORT = process.env.PORT || 3000;  //set the port that the project will use

// Set the view directory to /views
app.set("views", __dirname + "/screens");

// Let's use the Pug templating language
app.set("view engine", "pug");

// When a GET request is made to the root path: '/' reply with Hello World
app.get('/', function(request, response) {
  response.render("hello", {message: 'Hello & Welcome to the TimeStamp Microservice'});
});

app.get('/about', function(request, response) {
	response.end('This is the ABOUT US page');
})

app.get("*", function(request, response) {
  response.end("404! Page not found!");
});

// We set the app to listen on the given PORT
// It will log a message to the console once it is ready
app.listen(PORT, function() {
  console.log('Server is listening on port ' + PORT);
});

