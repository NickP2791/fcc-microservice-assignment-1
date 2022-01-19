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
  res.sendFile(__dirname + "/dist/index.html");
});

// your first API endpoint...
app.get("/api/:datecheck", function (req, res) {
  const input = req.params.datecheck;
  const unixpattern = /^\d{13}$/;
  const datepattern =
    /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/;

  if (unixpattern.test(input) || datepattern.test(input)) {
    // need to convert any input to unix
    const utctime = unixpattern.test(input)
      ? new Date(Number(input)).toUTCString()
      : new Date(input).toUTCString();

    const unixtime = unixpattern.test(input)
      ? +input
      : datepattern.test(input)
      ? new Date(input).getTime()
      : null;

    res.json({
      unix: unixtime,
      utc: utctime,
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

app.get("/api/", function (req, res) {
  const input = new Date().getTime();

  // need to convert any input to unix
  const utctime = new Date(input).toUTCString();

  res.json({
    unix: +input,
    utc: utctime,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
