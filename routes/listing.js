const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingControllers = require("../controllers/listing.js");
const Listing = require ("../models/listing.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router
   .route("/")
   .get (wrapAsync(listingControllers.index))
   .post(isLoggedIn, 
    upload.single("listing[image]"), 
    validateListing,
   wrapAsync(listingControllers.create));
    

//new route
router.get ("/new", isLoggedIn ,wrapAsync(listingControllers.new));


//Edit Route
router.get("/:id/edit" ,isLoggedIn,isOwner , wrapAsync(listingControllers.edit));

//update route
router.put("/:id",isLoggedIn,isOwner ,  upload.single("listing[image]"),  validateListing, wrapAsync(listingControllers.update));

//delete Route
router.delete ("/:id" ,isLoggedIn,isOwner , wrapAsync(listingControllers.delete));

//show route
router.get ("/:id",wrapAsync(listingControllers.show));

module.exports = router;

