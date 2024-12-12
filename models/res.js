const mongoose = require("mongoose");

const resSchema = new mongoose.Schema({
    name: String,
    roll: Number,
    SGPASem1: Number,
    SGPASem2: Number,
    Sr: Number,
    dept: String,
});

const result = mongoose.model("res", resSchema);

module.exports = result;