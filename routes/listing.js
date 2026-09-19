const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
// show all listing --> Index Route
.get(wrapAsync(listingController.index))   
// Create route
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));


router.route("/new")
// New Route
.get(isLoggedIn,listingController.renderNewForm);


router.route("/:id")
// Show individual listing --> Show Route
.get(wrapAsync(listingController.showListing))
// update route
.put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing,wrapAsync(listingController.updateListing))
// Delete route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));


// Edit route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;