const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



module.exports.index = async (req,res)=>{
    const allListing = await Listing.find({})
    res.render("listings/index.ejs",{allListing})
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs")
};

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const indvList = await Listing.findById(id).populate({path:"reviews", populate: {path: "author"}}).populate("owner");
    if(!indvList){
        req.flash("error","Listing does not exist!")
        return res.redirect("/listings")
    }
    console.log(indvList)
    res.render("listings/show.ejs",{indvList})
};

module.exports.createListing = async (req,res,next)=>{

    let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location ,
    limit: 1,
    })
    .send();

    // const listing = req.body.listing
    // console.log(listing)

    let url = req.file.path;
    let filename = req.file.filename;

    const listing = new Listing(req.body.listing)
    listing.owner = req.user._id;
    listing.image = {url, filename};

    listing.geometry = response.body.features[0].geometry;

    let savedListing = await listing.save();
    console.log(savedListing);
    req.flash("success","Successfully Created a New Listing")
    res.redirect("/listings")
};

module.exports.renderEditForm = async (req, res)=>{
    const {id} = req.params;

    const prevData = await Listing.findById(id)
    if(!prevData){
        req.flash("error","Cannot find that Listing")
        return res.redirect("/listings")
    }

    let originalImageURL = prevData.image.url;
    originalImageURL = originalImageURL.replace("/upload","/upload/w_250");

    res.render("listings/edit.ejs",{prevData,originalImageURL});
};

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }
    req.flash("success","Listing Updated")
    res.redirect(`/listings/${id}`)
};

module.exports.deleteListing = async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success","Listing Deleted")
    res.redirect("/listings")
};