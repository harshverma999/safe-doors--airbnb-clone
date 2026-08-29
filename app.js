const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/safedoor"
const Listing = require("./models/listing.js");


main()
.then(()=>{
    console.log("Connection Established with DB");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
await mongoose.connect(MONGO_URL);
};

app.get("/sampleListing",async(req, res)=>{
    let testListing = new Listing({
        title:"Fully air",
        description:"aajao",
        price:1000,
        location:"palamu",
        country:"India",
    });
    await testListing.save();
    res.send("test passed");
});

app.get("/",(req,res)=>{
    res.send("Root is Working");
});

app.listen(8080,()=>{
    console.log("Server is running at Port : 8080");
});