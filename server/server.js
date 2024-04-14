const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const compression = require("compression");

const header = {
  setHeaders: (res, path) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.setHeader("Expires", "-1");
    res.setHeader("Pragma", "no-cache");
  },
};

app.use(compression());
app.use(express.static(path.join(__dirname, "../build"), header));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () =>
  console.log(`express listening at http://localhost:${port}`)
);
