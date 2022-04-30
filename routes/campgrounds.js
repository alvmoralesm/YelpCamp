const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
  canManageCampgrounds,
} = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(campgrounds.index)
  .post(
    isLoggedIn,
    canManageCampgrounds,
    upload.array("image"),
    validateCampground,
    campgrounds.createCampground
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(campgrounds.campgroundDetails)
  .put(
    isLoggedIn,
    canManageCampgrounds,
    isAuthor,
    upload.array("image"),
    validateCampground,
    campgrounds.editCampground
  )
  .delete(
    isLoggedIn,
    canManageCampgrounds,
    isAuthor,
    campgrounds.deleteCampground
  );

router.get("/:id/edit", isLoggedIn, isAuthor, campgrounds.renderEditForm);

module.exports = router;
