const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const User = require('../models/user.model');
const JWT_KEY = "default_key";
const JWT_TOKEN_LIFETIME = 100000;


// acceso a la base de datos PostgreSQL con Sequelize

// function that tells you if user exists
// problem: roles
// function that 

//


exports.register = (req, res) => {
    // verify existence in DB using sequelize
    // request should have in body: {mail: ..., password: ..., info: {..., address, etc}}
    var newUser = new User(req.body.mail, bcrypt.hashSync(req.body.password, 10), req.body.info)
    // push to DB... and await confirmation i guess

    return res.status(201).json({
        "msg": "new user created!"
    })
}

exports.login = (req, res) => {

    const { mail, password, info } = req.body

    const user = true// fetch from DB

    if (user) {
        const accessToken = jwt.sign({ mail: user.mail }, JWT_KEY, { expiresIn: "1h", algorithm: "HS256" });
        return res.status(200).json({ token: accessToken });
    } else {
        return res.status(401).json({ message: "Invalid credentials" })
    }
}

exports.authenticate = (req, res) => {
    let authHeader = req.headers["authorization"]
    let token;

    if (authHeaderl.startsWith("Bearer ")) {

        token = authHeader.substring(7, authHeader.length);
        token = jwt.verify(token, process.env.ACCESS_JWT_KEY || "default_key");

        let user_found = true // checks if user exists

        if (user_found)
            return res.status(200).send();
        else
            return res.status(401).send();

    } else {    // no token was given
        return res.status(401).send();
    }
}