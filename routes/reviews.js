const express = require("express");
const router = express.Router({ mergeParams: true });
const reviews = require("../controllers/reviews");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
  canReview,
} = require("../middleware");

router.post("/", isLoggedIn, canReview, validateReview, reviews.createReview);

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviews.deleteReview);

module.exports = router;
