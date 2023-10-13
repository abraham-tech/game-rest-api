const User = require("../data/schemas/users.model");

const register = function (req, res) {
    console.log("Register User");
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var name = req.body.name;
        var password = req.body.password;
        const response = { status: 0, message: {} };

        User.create().then(user => {
            response.status = 201;
            response.message = user;
        }).catch(err => {
            console.log(err);
            response.status = 500;
            response.message = { "message": "Server error" };
        }).finally(() => {
            res.status(response.status).json(response.message)
        });
    } else {
        res.status(404).json({ "message": "Username and password are required fields. " })
    }
}

const login = function (req, res) {
    console.log("Loggin in user");
    var username = req.body.username;
    var password = req.body.password;

    const response = { status: 0, message: {} };

    User.findOne({ username: username }).exec().then(user => {
        if (!user) {
            response.status = 400;
            response.message = { "message": "Invalid credintial" }
        } else {
            if (user && password === user.password) {
                console.log("Login success");
                response.status = 200;
                response.message = { "message": "Success" }
            } else {
                response.status = 400;
                response.message = { "message": "Invalid credintial" }
            }
        }

    }).catch(err => {
        console.log(err);
        response.status = 500;
        response.message = { "message": "Server error" }

    }).finally(() => {
        res.status(response.status).json(response.message);

    });
}


module.exports = {
    register,
    login
}