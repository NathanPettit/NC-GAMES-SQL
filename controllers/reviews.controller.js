const {
  fetchAllReviews,
  fetchReviewById,
  updateReviewById,
} = require("../models/reviews.model.js");

exports.getAllReviews = (req, res, next) => {
  fetchAllReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewById = (req, res) => {
  const { review_id } = req.params;
  fetchReviewById(review_id).then((review) => res.status(200).send({ review }));
};

exports.patchReviewById = (req, res) => {
  const body = req.body;
  const id = req.params;
  updateReviewById(body, id.review_id).then((review) => {
    return res.status(200).send({ review });
  });
};
