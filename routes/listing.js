const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");

const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map(el=>el.message).join(",");
        throw new ExpressError(400,errorMsg);
    }else{
        next();
    }
}


// show all listing --> Index Route
router.get("/",wrapAsync(async (req,res)=>{
    const allListing = await Listing.find({})
    res.render("listings/index.ejs",{allListing})
}))

// New Route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs")
})

// Show individual listing --> Show Route
router.get("/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const indvList = await Listing.findById(id).populate("reviews");
    if(!indvList){
        req.flash("error","Listing does not exist!")
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs",{indvList})
})
);

// Create route
router.post("/",validateListing,wrapAsync(async (req,res,next)=>{
    // const listing = req.body.listing
    // console.log(listing)

    const listing = new Listing(req.body.listing)
    await listing.save()
    req.flash("success","Successfully Created a New Listing")
    res.redirect("/listings")
}))

// Edit route
router.get("/:id/edit",wrapAsync(async (req, res)=>{
    const {id} = req.params;

    const prevData = await Listing.findById(id)
    if(!prevData){
        req.flash("error","Cannot find that Listing")
        return res.redirect("/listings")
    }
    res.render("listings/edit.ejs",{prevData})
})
);

// update route
router.put("/:id",validateListing,wrapAsync(async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash("success","Listing Updated")
    res.redirect(`/listings/${id}`)
}))

// Delete route
router.delete("/:id", wrapAsync(async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success","Listing Deleted")
    res.redirect("/listings")
})
);

module.exports = router;