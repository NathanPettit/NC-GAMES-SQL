const db = require("../db/connection.js");

exports.fetchAllReviews = () => {
  let queryStr = `SELECT * FROM reviews`;

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
  const { title, review_body } = body;
  return db
    .query(
      "UPDATE reviews SET title = $1, review_body = $2 WHERE review_id = $3 RETURNING *;",
      [title, review_body, id]
    )

    .then(({ rows }) => {
      console.log(id);
      console.log(body);
      console.log(rows);
      return rows[0];
    });
};
