const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/safedoor"
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");
const {listingSchema} = require("./schema.js");

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

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map(el=>el.message).join(",");
        throw new ExpressError(400,errorMsg);
    }
}

// show all linsting
app.get("/listings",wrapAsync(async (req,res)=>{
    const allListing = await Listing.find({})
    res.render("listings/index.ejs",{allListing})
}))

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

// app.post("/listings",async (req,res)=>{
//     const {title,description,price,location,country} = req.body;

//     await Listing.insertOne({
//         title: title,
//         description: description,
//         price: price,
//         location: location,
//         country: country,
//     });
//     res.redirect("/listings")

// })

// Create route
app.post("/listings",validateListing,wrapAsync(async (req,res,next)=>{
    // const listing = req.body.listing
    // console.log(listing)

    const listing = new Listing(req.body.listing)
    await listing.save()
    res.redirect("/listings")
}))

app.delete("/listings/:id", wrapAsync(async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings")
})
);

// update route
app.put("/listings/:id",validateListing,wrapAsync(async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.prevData})
    res.redirect(`/listings/${id}`)
}))

// Edit route
app.get("/listings/:id/edit",wrapAsync(async (req, res)=>{
    const {id} = req.params;

    const prevData = await Listing.findById(id)
    res.render("listings/edit.ejs",{prevData})
})
);

// show individual list
app.get("/listings/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const indvList = await Listing.findById(id)
    res.render("listings/show.ejs",{indvList})
})
);


// data init testing...
// app.get("/sampleListing",async(req, res)=>{
//     let testListing = new Listing({
//         title:"Fully air",
//         description:"aajao",
//         price:1000,
//         location:"palamu",
//         country:"India",
//     });
//     await testListing.save();
//     res.send("test passed");
// });




app.get("/",(req,res)=>{
    res.send("Root is Working");
});

app.all("/{*splat}",(req, res, next)=>{
    next(new ExpressError(404, "Page Not Found..."));
});

app.use((err, req, res, next)=>{
    const {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).render("listings/error.ejs", {message});
});

app.listen(8080,()=>{
    console.log("Server is running at Port : 8080");
});