// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:datecheck", function (req, res) {
  const newdate = new Date(req.params.datecheck);
  const time = newdate.getTime();
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
    newdate.getDay()
  ];
  const dayutc = newdate.getUTCDate();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][newdate.getMonth()];
  const year = newdate.getFullYear();

  res.json({
    unix: time,
    utc: `${day}, ${dayutc} ${month} ${year} 00:00:00 GMT`,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
