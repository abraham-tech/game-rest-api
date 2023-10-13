const express = require("express");
const router = express.Router();
const gameControllers = require("../controllers/game.controllers");
const publisherControllers = require("../controllers/publisher.controllers");
const reviewsControllers = require("../controllers/reviews.controllers");
const userControllers = require("../controllers/user.controllers");
const { validateIdMiddleware, validateIdsMiddleware } = require("../controllers/validation");

router.use("/games/:gameId/reviews/:reviewId", validateIdsMiddleware);
router.use("/games/:gameId", validateIdMiddleware);

router.route("/games")
  .get(gameControllers.getAll)
  .post(gameControllers.addOne);

router.route("/games/:gameId")
  .get(gameControllers.getOne)
  .put(gameControllers.fullUpdateOne)
  .delete(gameControllers.deleteOne)
  .patch(gameControllers.partialUpdateOne);


router.route("/games/:gameId/publishers")
  .get(publisherControllers.getOne)
  .post(publisherControllers.addOne)
  .put(publisherControllers.updateOne)
  .delete(publisherControllers.deleteOne);


router.route("/games/:gameId/reviews")
  .get(reviewsControllers.getAll)
  .post(reviewsControllers.addOne)
  .put(reviewsControllers.updateOne)
  .delete(reviewsControllers.deleteOne);

router.route("/users")
  .post(userControllers.register);

router.route("/users/login")
  .post(userControllers.login);

module.exports = router;
