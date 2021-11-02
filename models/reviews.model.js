const db = require("../db/connection.js");

exports.fetchAllReviews = () => {
  let queryStr = `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, 
                  reviews.review_img_url, reviews.created_at, reviews.votes, 
                  COUNT(comments.comment_id) AS comment_count
                  FROM reviews
                  LEFT JOIN comments ON reviews.review_id=comments.review_id
                  GROUP BY reviews.review_id;`;
  // let queryStr = `SELECT
  //COUNT(commnets.comment_id) AS comments comments.comment_id FROM comments
  //                 JOIN comments.comment_id
  //                 WHERE reviews.review_id = comments.review_id`;

  return db.query(queryStr).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "No reviews have been found",
      });
    }

    return rows;
  });
};

exports.fetchReviewById = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
    .then((result) => {
      if (result === undefined) {
        return Promise.reject({
          status: 404,
          msg: "Review not found",
        });
      }
      return result.rows[0];
    });
};

exports.updateReviewById = (body, id) => {
  const votes = body.inc_votes;
  return db
    .query(
      "UPDATE reviews SET votes = votes+$1 WHERE review_id = $2 RETURNING *;",
      [votes, id]
    )

    .then(({ rows }) => {
      return rows[0];
    });
};
