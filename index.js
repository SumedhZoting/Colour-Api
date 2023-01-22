const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express()
const ColorThief = require('color-extr-thief');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

app.post("/hex", (req, res) => {
    ColorThief.getColor(req.body.imgurl)
        .then(color => {
            domcolour = rgbToHex(color[0], color[1], color[2])
            res.send(domcolour)
        })
})

app.post("/rgb", (req, res) => {
    ColorThief.getColor(req.body.imgurl)
        .then(color => {
            res.send(color)
        })
});

app.post("/palette", (req, res) => {
    ColorThief.getPalette(req.body.imgurl, 5)
        .then(palette => { res.send(palette) })
        .catch(err => { console.log(err) })
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