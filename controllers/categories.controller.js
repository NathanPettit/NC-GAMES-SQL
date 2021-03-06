const { fetchAllCategories } = require("../models/categories.model.js");

exports.getAllCategories = (req, res, next) => {
 
  fetchAllCategories()
    .then((categories) => {
      res.status(200).send({ categories });
  
    })
    .catch((err) => {
      next(err);
    });
};
