const Game = require("../data/schemas/games.model");

const getAll = function (req, res) {
    var gameId = req.params.gameId;
    const response = {
        status: 0,
        message: {}
    }

    Game.findById(gameId).select("reviews").exec().then(game => {
        if (!game) {
            response.status = 404;
            response.message = { "message": "Game not found" }
        }
        response.status = 200;
        response.message = game;
    }).catch(err => {
        console.log(err);
        response.status = 500;
        response.message = { "message": "Server error" };
    }).finally(() => {
        res.status(response.status).json(response.message);
    });
}

const addOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec().then(game => {
        if (!game) {
            res.status(404).json({ "message": "Game not found. " });
        } else {
            game.reviews = req.body.reviews;
            const response = {
                status: 0,
                message: {}
            }
            game.save().then(game => {
                response.status = 201;
                response.message = game;
            }).catch(err => {
                console.log(err);
                response.status = 500;
                response.message = { "message": "Server error" }
            }).finally(() => {
                res.status(response.status).json(response.message);
            })
        }
    }).catch(err => {
        res.status(500).json({ "message": "Server error" });
    });
};

module.exports.reviewsGetOne = function (req, res) {
    var gameId = req.params.gameId;
    var reviewId = req.params.reviewId;

    Game.findById(gameId).select("reviews").exec(function (err, game) {
        if (err) {
            res.status(500).json(err);
        } else if (!game) {
            res.status(404).json({ "message": "Game not found" });
        } else {
            var review = game.reviews.id(reviewId);
            if (review) {
                res.status(200).json(review);
            } else {
                res.status(404).json({ "message": "Review not found" });
            }
        }
    })
}



const updateOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec().then(game => {
        if (!game) {
            res.status(404).json({ "message": "Game not found. " });
        } else {
            game.reviews = req.body.reviews;
            const response = {
                status: 0,
                message: {}
            }
            game.save().then(game => {
                response.status = 201;
                response.message = game;
            }).catch(err => {
                console.log(err);
                response.status = 500;
                response.message = { "message": "Server error" }
            }).finally(() => {
                res.status(response.status).json(response.message);
            })
        }
    }).catch(err => {
        res.status(500).json({ "message": "Server error" });
    });
}

const deleteOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec().then(game => {
        if (!game) {
            res.status(404).json({ "message": "Game not found. " });
        } else {
            game.reviews = undefined;
            const response = {
                status: 0,
                message: {}
            }
            game.save().then(game => {
                response.status = 201;
                response.message = game;
            }).catch(err => {
                console.log(err);
                response.status = 500;
                response.message = { "message": "Server error" }
            }).finally(() => {
                res.status(response.status).json(response.message);
            })
        }
    }).catch(err => {
        res.status(500).json({ "message": "Server error" });
    });
}


module.exports = {
    getAll,
    addOne,
    updateOne,
    deleteOne
}