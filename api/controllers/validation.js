require("dotenv").config();

const isInvalidObjectId = (id) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
};

const validateIdMiddleware = (req, res, next) => {
  const gameId = req.params.gameId;

  if (!isInvalidObjectId(gameId)) {
    return res
      .status(500)
      .json({ message: "Invalid Id" });
  }
  next();
};

const validateIdsMiddleware = (req, res, next) => {
  const gameId = req.params.gameId;
  const reviewId = req.params.reviewId;
  if (!isInvalidObjectId(gameId) || !isInvalidObjectId(reviewId)) {
    return res
      .status(500)
      .json({ message: "Invalid Id" });
  }
  next();
};

module.exports = { validateIdMiddleware, validateIdsMiddleware };
