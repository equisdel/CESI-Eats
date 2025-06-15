//const bcrypt = require('bcrypt');       // hashing password
const jwt = require('jsonwebtoken');    // issuing/veryfying token

const JWT_KEY = process.env.JWT_KEY || "default_key";
const JWT_TOKEN_LIFETIME = process.env.JWT_TOKEN_LIFETIME || "1h";

const User = require('../models/user.model');

async function getUser(type,mail) {
    return await User.findOne( { where: {mail: mail, role: type} })
}

function isValidToken(token) {
    return jwt.verify(token,JWT_KEY,{algorithms: ["HS256"]})
}

const authenticate = async (req, res, next) => {

    let authHeader = req.headers["authorization"]

    if (authHeader && authHeader.startsWith("Bearer ")) {

        let token = authHeader.substring(7, authHeader.length)
        if (isValidToken(token)) {
            return res.status(200).json({"msg": "Valid Token"})
        } else {
            return res.status(401).json({"msg": "Invalid Token"})
        }

    } else {
        return res.status(401).json({"msg": "Missing token"})
    }
}

const register = async (req, res) => {  // Changed to const definition
    const { type, mail, password, info } = req.body;
    const user = await getUser(type, mail);
    if (user) {
        res.status(409).json({ error: 'User already exists' });
    } else {
        const hashed_pw = bcrypt.hashSync(password, 10);
        try {
            const newUser = await User.create({
                first_name: info.first_name,
                last_name: info.last_name,
                mail,
                password: hashed_pw,
                phone_number: info.phone_number,
                birthday_date: info.birthday_date,
                role: type || 'user',
            });
            res.status(201).json({ msg: 'User created successfully!', user: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
}

const login = async (req, res) => {  // Changed to const definition
    const { type, mail, password } = req.body;
    const user = await getUser(type, mail);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ mail: user.mail }, JWT_KEY, { expiresIn: JWT_TOKEN_LIFETIME });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
}

module.exports = { register, login, authenticate };

/*
async function register(req, res) {
    const { type, mail, password, info } = req.body;
    const user = await getUser(type,mail) // verify for existence
    if (user) {
        res.status(500).json({ error: 'failed to create user' });
    } else {
        hashed_pw = null //bcrypt.hashSync(password, 10)   // hashed password for extra safety
        try {
            const newUser = User.create({
                first_name : info.first_name,
                last_name : info.last_name,
                mail,
                password, // change to hashed_pw 
                phone_number : info.phone_number,
                birthday_date : info.birthday_date,
                role: type || 'user',
            });
            res.status(201).json({ msg: 'new user created successfully!', user: newUser });
        } catch (error) {
            console.error('[!] error creating user:', error);
            res.status(500).json({ error: 'failed to create user' });
        } 
    }
}

async function login(req, res) {

    const { type, mail, password, info } = req.body

    const user = await getUser(type,mail) 

    // verification: user exists and password is right
    // if (user && bcrypt.compareSync(password, user.hashed_pw)) {
    if (user && password==user.password) {
        const accessToken = jwt.sign({ mail: user.mail }, JWT_KEY, { expiresIn: JWT_TOKEN_LIFETIME, algorithm: "HS256" });
        return res.status(200).json({ token: accessToken });
    } else {
        return res.status(401).json({ message: "invalid login credentials" })
    }
}

module.exports = { register, login };
*/
