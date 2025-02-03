const express = require("express");
const router = express.Router({mergeParams :true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require ("../models/review.js");
const Listing = require ("../models/listing.js");
const mongoose = require('mongoose');
const Joi = require('joi');
const {validateReview , isLoggedIn , isReviewAuthor} = require("../middleware.js");
const reviewControllers = require("../controllers/review.js");

//review route

//post review route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewControllers.post));

// delete review route
router.delete("/:reviewId" ,isLoggedIn,isReviewAuthor, wrapAsync(reviewControllers.delete));

module.exports = router;
