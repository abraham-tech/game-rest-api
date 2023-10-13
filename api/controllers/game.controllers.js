
const Game = require("../data/schemas/games.model");


// const getAll = function (req, res) {
//   const response = {
//     status: 200,
//     message: "success"
//   };
//   Game.find({ "designers": req.query.designer }).then(game => {
//     if (!game) {
//       response.status = 404;
//       response.message = response.message = { "message": "Game Id no found 1" };
//     }
//     response.status = 200;
//     response.message = game;
//   }).catch(err => {
//     response.status = 500;
//     response.message = err;
//   }).finally(message => {
//     res.status(response.status).json(response.message);
//   })
// }


// var runGeoQuery = function (req, res) {
//   const lng = parseFloat(req.query.lng);
//   const lat = parseFloat(req.query.lat);
//   const point = {
//     type: "Point",
//     coordinates: [lng, lat]
//   };
//   Game.aggregate([
//     {
//       "$geoNear": {
//         "near": point,
//         "spherical": true,
//         "distanceField": "distance",
//         "maxDitance": 7500000,
//         "limit": 5
//       }
//     }
//   ], function (err, results) {
//     console.log("Geo results ", results);
//     console.log("Geo error ", err);
//     res.status(200).json(results);
//   }
//   );
// }

const getAll = function (req, res) {
  console.log("Get all games request recived");

  var offset = 0;
  var count = 5;
  const maxCount = 10;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  if (res.query && req.query.lat && res.query && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }

  if (isNaN(offset) || isNaN(count)) {
    res.status(404).json({ "message": "Offset or Count is not a number" });
    return;
  }

  if (count > maxCount) {
    res.status(400).json({ "message": "Count should be less than " + maxCount });
  }
  const response = {
    status: 0,
    message: {}
  };

  Game.find().skip(offset).limit(count).exec().then(games => {
    console.log("Success games are found");
    response.status = 200;
    response.message = games;
  }).catch(err => {
    console.log(err);
    response.status = 500;
    response.message = game;
  }).finally(() => {
    res.status(response.status).json(response.message);
  })
}

const getOne = function (req, res) {
  const gameId = req.params.gameId;
  const response = {
    status: 0,
    message: {}
  };
  Game.findById(gameId).exec().then(game => {
    if (!game) {
      response.status = 404;
      response.message = { "message": "Game not found" }
    } else {
      response.status = 200;
      response.message = game;
    }

  }).catch(err => {
    console.log(err);
    response.status = 500;
    response.message = { "message": "Server Error" };
  }).finally(() => {
    res.status(response.status).json(response.message);
  })
}

const addOne = function (req, res) {
  console.log("POST to add a game");

  if (req.body && req.body.title && req.body.price) {

    let game = {
      title: req.body.title,
      year: req.body.year,
      rate: req.body.rate,
      price: req.body.price,
      minPlayers: req.body.minPlayers,
      maxPlayers: req.body.maxPlayers,
      // publisher: {},
      reviews: "",
      minAge: req.body.minAge,
      // designers: req.body.designers
    };

    const response = {
      status: 0,
      message: {}
    };

    Game.create(game).then(game => {
      if (!game) {
        response.status = 400;
        response.message = { "message": "Bad request" };
      } else {
        response.status = 200;
        response.message = game;
      }

    }).catch(err => {
      console.log(err);
      response.status = 500;
      response.message = { "message": "Server error" };
    }).finally(() => {
      res.status(response.status).json(response.message);
    });
  }
}

const fullUpdateOne = function (req, res) {
  const gameId = req.params.gameId;
  const response = {
    status: 0,
    message: {}
  }
  Game.findById(gameId).select("-reviews -publisher").exec().then(game => {
    if (!game) {
      res.status(404).json({ "message": "Game not found" });
    } else {
      game.title = req.body.title;
      game.year = parseInt(req.body.year);
      game.price = parseFloat(req.body.price);
      game.rate = parseInt(req.body.rate);
      game.minPlayers = parseInt(req.body.minPlayers);
      game.maxPlayers = parseInt(req.body.maxPlayers);
      game.minAge = parseInt(req.body.minAge);
      game.designers = req.body.designers;
      game.save().then(data => {
        response.status = 201;
        response.message = data;
      }).catch(err => {
        response.status = 500;
        response.message = { "message": "Server error" };
      }).finally(() => {
        res.status(response.status).json(response.message);
      });
    }
  }).catch(err => {
    console.log(err);
    response.status = 500;
    res.status(500).json({ "message": "Server error" });
  })
};

const deleteOne = function (req, res) {
  const gameId = req.params.gameId;
  console.log("Recived a request to delete game by id: " + gameId);
  const response = {
    status: 0,
    message: {}
  };
  Game.findByIdAndRemove(gameId).exec().then(game => {
    if (!game) {
      response.status = 404;
      response.message = { "message": "game not found" };
    } else {
      response.status = 200;
      response.message = { "message": "Success" };
    }
  }).catch(err => {
    console.log(err);
    response.status = 500;
    response.message = { "message": "Server error" }
  }).finally(() => {
    res.status(response.status).json(response.message);
  });
}

const partialUpdateOne = function (req, res) {
  console.log("PATCH one game");
};


module.exports = {
  getAll,
  addOne,
  getOne,
  fullUpdateOne,
  deleteOne,
  partialUpdateOne
}

