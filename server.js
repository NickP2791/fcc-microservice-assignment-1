// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

const PORT = process.env.PORT || 5000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

// your first API endpoint...
app.get("/api/:datecheck", function (req, res) {
  let input = req.params.datecheck;
  const unixpattern = /^\d{13}$/;

  const output = {};

  if (unixpattern.test(input)) {
    //check if timestamp
    //then change from string to integer
    input = parseInt(input);

    output["unix"] = new Date(input).getTime();
    output["utc"] = new Date(input).toUTCString();
  } else if (!isNaN(Date.parse(input))) {
    //check if iso date yyyy-mm-dd or dd mmm yyyy
    output["unix"] = new Date(input).getTime();
    output["utc"] = new Date(input).toUTCString();
  } else {
    res.json({ error: "Invalid Date" });
  }
  res.json(output);
});

// endpoint for empty req
app.get("/api/", function (req, res) {
  const today = new Date().getTime();
  const output = {};
  output["unix"] = +today;
  output["utc"] = new Date(today).toUTCString();

  res.json(output);
});

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
