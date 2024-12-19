const express = require('express')
const app = express()
const port = 8080;
const result = require("./models/res.js")
require('dotenv').config();
const mongoose = require("mongoose");
const path = require("path")
const dbUrl= process.env.ATLASDB_URI;


main().then(() => {
  console.log("connect to db");
}).catch((err) => {
  console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine ", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.get('/', (req, res) => {
    res.render("./results/home.ejs")
})

app.get("/results", async (req, res) => {
    let allResults = await result.find({});
    res.render("./results/index.ejs", { allResults })
})

app.get("/results/:id", async (req, res) => {
    let { id } = req.params;
    const r = await result.findById(id);
    res.render("./results/show.ejs", { r});
})
app.get("/contact", (req, res) => {
  res.render("./results/contact.ejs");
})
app.get("/nikhil", (req, res) => {
  res.render("./results/nikhil.ejs");
})
app.get("/avinash", (req, res) => {
  res.render("./results/avi.ejs");
})
app.get("/abhinav", (req, res) => {
  res.render("./results/abhinav.ejs");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})