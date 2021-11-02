const reviewsRouter = require("express").Router();
const {
  getAllReviews,
  getReviewById,
  patchReviewById,
} = require("../controllers/reviews.controller.js");

reviewsRouter.route("/").get(getAllReviews);
reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);

module.exports = reviewsRouter;
