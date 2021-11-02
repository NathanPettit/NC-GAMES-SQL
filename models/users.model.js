const db = require("../db/connection.js");

exports.fetchAllUsers = (username) => {
  const queryValues = [];

  let queryStr = `SELECT username FROM users`;

  if (username) {
    queryValues.push(username);
    queryStr += ` WHERE username = $dav3rid`;
  }

  return db.query(queryStr, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "No users with that username have been found",
      });
    }
    return rows;
  });
};
