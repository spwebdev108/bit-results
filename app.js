const express = require('express')
const app = express()
const port = 8080;
const result = require("./models/res.js")
const mongoose = require("mongoose");
const path = require("path")
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/result');
}

main().then(() => {
    console.log("connect to db");
}).catch((err) => {
    console.log(err);
});

app.set("view engine ", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.get('/', (req, res) => {
    res.send('Hello World!')
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