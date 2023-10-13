const Game = require("../data/schemas/games.model");
const { response } = require("express");

const getOne = function (req, res) {
    var gameId = req.params.gameId;
    console.log("Recived request to get a publisher ")

    const response = {
        status: 0,
        message: {}
    }
    Game.findById(gameId).select("publisher").exec().then(publisher => {
        if (!publisher) {
            response.status = 404;
            response.message = { "message": "Game not found" };
        } else {
            response.status = 200;
            response.message = publisher;
        }
    }).catch(err => {
        console.log(err);
        response.status = 500;
        response.message = { "message": "Server Error" };
    }).finally(() => {
        res.status(response.status).json(response.message);
    })
};

const addOne = function (req, res) {
    var gameId = req.params.gameId;

    Game.findById(gameId).exec().then(game => {
        if (!game) {
            res.status(404).json({ "message": "Game not found" });
        } else {
            game.publisher = new Object();
            game.publisher.name = req.body.name;
            game.publisher.location = {
                type: req.body.type,
                coordinates: [req.body.lng, req.body.lat]
            }
            const response = {
                status: 0,
                message: {}
            }
            game.save().then(game => {
                response.status = 200;
                response.message = game;
            }).catch(err => {
                console.log(err);
                response.status = 500;
                response.message = { "message": "Server error" };
            }).finally(() => {
                res.status(response.status).json(response.message);
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ "message": "Server error" });
    });
}

const updateOne = function (req, res) {
    var gameId = req.params.gameId;


    Game.findById(gameId).exec().then(game => {
        if (!game) {
            res.status(404).json({ "message": "Game not found." })
        } else {
            game.publisher = new Object();
            game.publisher.name = req.body.name;
            game.publisher.location = {
                type: req.body.type,
                coordinates: [req.body.lng, req.body.lat]
            }
            const response = {
                status: 0,
                message: {}
            }
            game.save().then(game => {
                response.status = 200;
                response.message = game;
            }).catch(err => {
                console.log(err);
                response.status = 500;
                response.message = { "message": "Server Error" };
            }).finally(() => {
                res.status(response.status).json(response.message);
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ "message": "Server Error" });
    })
};

const deleteOne = function (req, res) {
    var gameId = req.params.gameId;

    Game.findById(gameId).select("-reviews").exec().then(game => {
        if (!game) {
            res.status(404).json({ "message": "Game not found" });
        } else {
            game.publisher = undefined;
            const response = {
                status: 0,
                message: {}
            };
            game.save().then(game => {
                response.status = 200;
                response.message = { "message": "Success" };
            }).catch(err => {
                console.log(err);
                response.status = 500;
                response.message = { "message": "Server Error" };
            }).finally(() => {
                res.status(response.status).json(response.message);
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ "message": "Server Error" });
    })
}


module.exports = {
    getOne,
    addOne,
    updateOne,
    deleteOne
}