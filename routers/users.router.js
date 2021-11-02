const usersRouter = require("express").Router();
const { getAllUsers } = require("../controllers/users.controller.js");

usersRouter.route("/").get(getAllUsers);

module.exports = usersRouter;
