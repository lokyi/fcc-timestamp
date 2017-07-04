// server.js

// init project
var express = require('express');
var moment = require('moment');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/:timestamp', function (request, response) {
  var time;
  if (isNaN(Number(request.params.timestamp))) {
    time = moment(request.params.timestamp);
  } else {
    time = moment.unix(parseInt(request.params.timestamp));
  }
  var unixTS = time.unix();
  var naturalDate = time.format("MMMM D, YYYY");
  if (!unixTS) return response.json({ "unix": null, "natural": null })
  response.json({ "unix": unixTS, "natural": naturalDate });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Timestamp microservice is listening on port ' + listener.address().port);
});
