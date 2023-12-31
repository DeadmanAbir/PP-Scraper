const express = require("express");
const cors = require("cors");
require('dotenv').config()
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const { run } = require("./scrapeLogic");
const PORT = process.env.PORT || 4000;
app.use(cors());
const cron = require('node-cron');
const { scrapeNewsAndSave } = require("./CronJobs/cronScripts");


mongoose.connect(process.env.MONGO_PASS, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/scrape/:link", (req, res) => {
  const link = req.params.link;
  run(res, link);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});
app.get("/test", (req, res) => {
  try {
    const response = fetch("https://www.imdb.com/");
    res.send(response);

  } catch (e) {
    console.log(e);
  }
});



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});