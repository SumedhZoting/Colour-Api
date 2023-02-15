const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express()
const ColorThief = require('color-extr-thief');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

app.post("/hex", (req, res) => {
  let colour = []
  ColorThief.getColor(req.body.imgurl + ".jpg")
    .then(color => {
      domcolour = rgbToHex(color[0], color[1], color[2])
      colour.push(domcolour)
      res.send(domcolour)
    })
})

app.post("/rgb", (req, res) => {
  ColorThief.getColor(req.body.imgurl + ".jpg")
    .then(color => {
      res.send(color)
    })
});

app.post("/palette", (req, res) => {
  if (req.body.imgurl == null) { return; }
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

app.listen(80, () => {
  console.log("server started")
})

function getdom(url) {
  ColorThief.getColor(url)
    .then(color => {
      domcolour = rgbToHex(color[0], color[1], color[2])
      return domcolour.toString()
    })
}
