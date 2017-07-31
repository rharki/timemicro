var express = require('express');
var http = require('http');

var app = express();
var PORT = process.env.PORT || 3000;  //set the port that the project will use

// Set the view directory to /views
app.set("views", __dirname + "/screens");

// Let's use the Pug templating language
app.set("view engine", "pug");

app.get("/:timeinput", function(req, res) {
  var timeinput = req.params.timeinput
  console.log("The time entered is, " + timeinput + ".");
  // res.send("The time entered is, " + timeinput + ".");
  res.json(getTimestampJSON(timeinput));
  // Fun fact: this has security issues
});

// When a GET request is made to the root path: '/' reply with Hello World
app.get('/hello', function(request, response) {
  response.render("hello", {message: 'Hello & Welcome to the TimeStamp Microservice'});
});

app.get('/about', function(request, response) {
	response.end('This is the ABOUT US page');
})

app.get("*", function(request, response) {
  response.end("404! Page not found!");
});

function getTimestampJSON(timestamp) {
	// First, we handle the unix timestamps. Path parameters come in as text
	// rather than numbers, so we'll attempt to parse them.
	var result = {
		unix: null,
		natural: null
	};

	var date;
	if (!isNaN(Date.parse(timestamp))) {
		result.unix = Date.parse(timestamp);
	} else {
		result.unix = null;
		result.natural = null;
	}


	if (!isNaN(parseInt(timestamp))) {
		date = new Date(parseInt(timestamp)); // first digit is a number, can be unix or date though
	} else {
		date = new Date(timestamp); // first digit is not number, need to check if the overall string is a valid date or not!
	}

	if (!isNaN(date.getTime())) {
		// Date.getTime() returns the unix timestamp,
		result.unix = date.getTime();
		result.natural = getNaturalDate(date);
	}
	return result;
}

function getNaturalDate(date) {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Obtober', 'November', 'December'];
	return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

// We set the app to listen on the given PORT
// It will log a message to the console once it is ready
app.listen(PORT, function() {
  console.log('Server is listening on port ' + PORT);
});

