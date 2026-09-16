const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/safedoor";

main()
.then(()=>{
    console.log("connection bn gya");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
};

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: "6aaa1fd35e1b2fdc3f4a55d1"}));
    await Listing.insertMany(initData.data);
    console.log("Data is initialized");
};
initDB();