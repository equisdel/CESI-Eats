const bcrypt = require('bcrypt');       // hashing password
const jwt = require('jsonwebtoken');    // issuing/veryfying token

const JWT_KEY = process.env.JWT_KEY || "default_key";
const JWT_TOKEN_LIFETIME = process.env.JWT_TOKEN_LIFETIME || "1h";

const User = require('../models/user.model');

async function getUser(type,mail) {
    return await User.findOne( { where: {mail: mail, role: type} })
}

exports.register = (req, res) => {
    const { type, mail, password, info } = req.body;
    const user = getUser(type,mail) // verify for existence
    if (user) {
        res.status(500).json({ error: 'failed to create user' });
    } else {
        hashed_pw = bcrypt.hashSync(password, 10)   // hashed password for extra safety
        try {
            const newUser = User.create({
                first_name : info.first_name,
                last_name : info.last_name,
                mail,
                hashed_pw, 
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

exports.login = (req, res) => {

    const { type, mail, password, info } = req.body

    const user = getUser(type,mail) 

    // verification: user exists and password is right
    if (user && bcrypt.compareSync(password, user.hashed_pw)) {
        const accessToken = jwt.sign({ mail: user.mail }, JWT_KEY, { expiresIn: JWT_TOKEN_LIFETIME, algorithm: "HS256" });
        return res.status(200).json({ token: accessToken });
    } else {
        return res.status(401).json({ message: "invalid login credentials" })
    }
}