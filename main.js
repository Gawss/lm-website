const express = require("express");
const path = require("path");
const fs = require("fs");

// const cors = require('cors');

const app = express();
const docsDir = path.join(__dirname, "docs");

// app.use(cors({
//     origin: '*'
// }));

let SERVER_PORT = 1337;

app.use(express.static(__dirname + "/public"));

const server = app.listen(process.env.PORT || SERVER_PORT, () => {
  console.log(
    "Express server listening on port %d in %s mode",
    server.address().port,
    app.settings.env
  );
  console.log("Server On", __dirname);
});

app.use(express.static(__dirname + "/public/resources"));
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  console.log("GET /");
  if (process.env.PORT != undefined) {
    res.sendFile(__dirname + "/public/inprogress.html");
  } else {
    res.sendFile(__dirname + "/public/main.html");
  }
});

app.use(express.static(__dirname + "/public/About"));
app.get("/luis", (req, res) => {
  console.log("GET /luis");
  res.sendFile(__dirname + "/public/About/about.html");
});

app.use(express.static(__dirname + "/Unity/space_invaders"));
app.get("/space_invaders", (req, res) => {
  console.log("GET /space_invaders");
  res.sendFile(__dirname + "/Unity/space_invaders/index.html");
});

app.use(express.static(__dirname + "/public/AR"));
app.get("/AR", (req, res) => {
  console.log("GET /AR");
  res.sendFile(__dirname + "/public/AR/AR.html");
});

app.use(express.static(__dirname + "/public/site/assets"));
app.use(express.static(__dirname + "/public/site"));
app.get("/lm", (req, res) => {
  res.sendFile(__dirname + "/public/site/index.html");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(express.static(__dirname + "/Unity/DTOWN_WebGL"));
app.get("/dtown", (req, res) => {
  res.sendFile(__dirname + "/Unity/DTOWN_WebGL/index.html");
});

// Middleware: disable cache *only if the file changed*
app.use((req, res, next) => {
  const filePath = path.join(docsDir, req.url.split("?")[0]);

  if (fs.existsSync(filePath)) {
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
  }

  next();
});

app.use(express.static(__dirname + "/docs"));
app.get("/portfolio", (req, res) => {
  res.sendFile(__dirname + "/docs/index.html");
});
