const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express()
const ColorThief = require('color-extr-thief');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post("/hex", (req, res) => {
  if (req.body.imgurl == null || req.body.imgurl == undefined || req.body.imgurl == "") {
    res.sendStatus(400)
    return;
  }
  let colour = []
  ColorThief.getColor(req.body.imgurl)
    .then(color => {
      domcolour = rgbToHex(color[0], color[1], color[2])
      colour.push(domcolour)
      res.send(domcolour)
    })
})

app.post("/rgb", (req, res) => {
  if (req.body.imgurl == null || req.body.url == undefined || req.body.url == "") {
    res.sendStatus(400)
    return;
  }
  ColorThief.getColor(req.body.imgurl)
    .then(color => {
      res.send(color)
    })
});

app.post("/palette", (req, res) => {
  if (req.body.imgurl == null || req.body.imgurl == undefined || req.body.imgurl == "") {
    res.sendStatus(400)
    return;
  }
  ColorThief.getPalette(req.body.imgurl, 5)
    .then(palette => {
      hexcolours = []
      i = 0;
      while (i != 5) {
        colour = rgbToHex(palette[i][0], palette[i][1], palette[i][2])
        hexcolours.push(colour)
        i = i + 1
      }
      res.send(hexcolours)
    })
})

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

app.listen(3000, () => {
  console.log("server started")
})

function getdom(url) {
  ColorThief.getColor(url)
    .then(color => {
      domcolour = rgbToHex(color[0], color[1], color[2])
      return domcolour.toString()
    })
}
