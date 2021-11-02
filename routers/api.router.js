const apiRouter = require("express").Router();
const categoriesRouter = require("./categories.router");
const usersRouter = require("./users.router");
const { reviewsRouter, reviewByIdRouter } = require("./reviews.router");

apiRouter.use("/users", usersRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/reviews", reviewByIdRouter);

module.exports = apiRouter;
