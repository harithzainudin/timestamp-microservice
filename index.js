// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res) {
  const date = new Date();
  
  const response = {
    unix: date.getTime(),
    utc: date.toJSON(),
  }

  console.log("empty date response");
  console.log(response);
  res.json(response);
})

app.get("/api/:date", function (req, res) {
  console.log("the request", req.params.date);
  let date = new Date(req.params.date);
  
  // check if its a unix timestamp 
  if (isNaN(date)) {
    date = new Date(Number(req.params.date));
    if (isNaN(date)) {
      response = {
        error: "Invalid Date",
      }    
    } else {
      response = {
        unix: Number(date.getTime()),
        utc: date.toUTCString(),
      };  
    }
  } else {
    response = {
      unix: Number(date.getTime()),
      utc: date.toUTCString(),
    };  
  }
  
  console.log(response);
  res.json(response);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
