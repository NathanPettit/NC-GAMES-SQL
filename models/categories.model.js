const db = require("../db/connection.js");

exports.fetchAllCategories = () => {

  let queryStr = `SELECT * FROM categories`;

  return db.query(queryStr).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "No categories have been found",
      });
    }
    
    return rows;
  });
};