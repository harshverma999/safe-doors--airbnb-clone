const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


// show all listing --> Index Route
router.get("/",wrapAsync(async (req,res)=>{
    const allListing = await Listing.find({})
    res.render("listings/index.ejs",{allListing})
}))

// New Route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs")
})

// Show individual listing --> Show Route
router.get("/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const indvList = await Listing.findById(id).populate({path:"reviews", populate: {path: "author"}}).populate("owner");
    if(!indvList){
        req.flash("error","Listing does not exist!")
        return res.redirect("/listings")
    }
    console.log(indvList)
    res.render("listings/show.ejs",{indvList})
})
);

// Create route
router.post("/",isLoggedIn,validateListing,wrapAsync(async (req,res,next)=>{
    // const listing = req.body.listing
    // console.log(listing)

    const listing = new Listing(req.body.listing)
    listing.owner = req.user._id;
    await listing.save()
    req.flash("success","Successfully Created a New Listing")
    res.redirect("/listings")
}))

// Edit route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(async (req, res)=>{
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
router.put("/:id",isLoggedIn, isOwner, validateListing,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash("success","Listing Updated")
    res.redirect(`/listings/${id}`)
}))

// Delete route
router.delete("/:id",isLoggedIn, isOwner, wrapAsync(async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success","Listing Deleted")
    res.redirect("/listings")
})
);

module.exports = router;