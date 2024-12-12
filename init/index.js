const mongoose = require('mongoose');
const result = require("../models/res")
const initData = require("./data.js")

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/result');
}

main().then(() => {
    console.log("connect to db");
}).catch((err) => {
    console.log(err);
});

const initDB = async () => {
    await result.deleteMany({});
    let a = await result.insertMany(initData.data);
    console.log(a);
}

initDB();

