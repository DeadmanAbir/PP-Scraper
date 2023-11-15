const express = require("express");
const cors=require("cors");
require('dotenv').config()
const app = express();
const {run}=require("./scrapeLogic");
const PORT = process.env.PORT || 4000;
app.use(cors());
app.get("/scrape/:link", (req, res) => {
    const link=req.params.link;
 run(res, link);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});