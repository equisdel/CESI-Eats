const bcrypt = require('bcrypt');       // hashing password
const jwt = require('jsonwebtoken');    // issuing/veryfying token

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || "default_key";
const JWT_TOKEN_LIFETIME = process.env.JWT_TOKEN_LIFETIME || "1h";

const User = require('../models/user.model');
const Restaurant = require('../models/restaurant.model');

async function getUser(email) {
    try {
        let user = await User.findOne( { where: {email} })
        return user
    } catch (error) {
        return null
    }
}

const authenticate = async (req, res) => {

    try {

        let authHeader = req.headers["authorization"]

        if (authHeader && authHeader.startsWith("Bearer ")) {
            let token = authHeader.substring(7, authHeader.length)
            if (jwt.verify(token,JWT_ACCESS_KEY,{algorithms: ["HS256"]})) {
                return res.status(200).json({"msg": "Valid Token"})
            } else {
                return res.status(401).json({"msg": "Invalid Token"})
            }
        } else {
            return res.status(401).json({"msg": "Missing token"})
        }

    } catch (error) {
        return res.status(401).json({ error: `Failed to authenticate user: ${error}`})
    }

}

async function registerRestaurant(restaurantInfo, ownerId) {
    try {
        console.log("restaurantInfo recibido:", restaurantInfo);
        console.log("owner_restaurant:", ownerId);
        const newRestaurant = await Restaurant.create({
            ...restaurantInfo,
            owner_restaurant: ownerId,
        });
        return newRestaurant;
    } catch (err) {
        console.error("Error creating restaurant:", err);
        throw err;
    }
}

const register = async (req, res) => {  
    const { role, email, password, info, restaurantInfo} = req.body;
    const user = await getUser(email);
    if (user) {
        return res.status(409).json({ error: 'User already exists' });
    } else {
        const hashed_pw = bcrypt.hashSync(password, 10);
        try {
            const newUser = await User.create({
                first_name: info.first_name,
                last_name: info.last_name,
                email: email,
                password: hashed_pw,
                phone_number: info.phone_number,
                birthday_date: info.birthday_date,
                role: role || 'user',
            });

            let newRestaurant = null;
            if (role === "restaurant" && restaurantInfo) {
                //We do this to ensure that the user is create in the table
                const owner = await User.findOne({ where: { email } });
            
                
                newRestaurant = await registerRestaurant(restaurantInfo, owner.user_id);
            }

            return res.status(201).json({ 
                msg: role === "restaurant"
                ? "User and restaurant created successfully!"
                : "User created successfully!",
                user: newUser,
                restaurant: newRestaurant
            });

        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'Failed to create user' });
        }
    }
}

const login = async (req, res) => {  // Changed to const definition
    const { email, password } = req.body;
    try {
        const user = await getUser(email);
        if (user && bcrypt.compareSync(password, user.password)) {
            if(user.role == "restaurant"){
                const restaurant = await Restaurant.findOne({
                    where: { owner_restaurant: user.user_id },
                    attributes: ['restaurant_id'], 
                });

                if (!restaurant) {
                    return res.status(404).json({ error: 'No restaurant found for this user' });
                }

                const token = jwt.sign(
                    { user_id: user.user_id, restaurant_id: restaurant.restaurant_id }, JWT_ACCESS_KEY,{ expiresIn: JWT_TOKEN_LIFETIME });

                return res.status(200).json({ token });
            } else {
                const token = jwt.sign({ user_id: user.user_id }, JWT_ACCESS_KEY, { expiresIn: JWT_TOKEN_LIFETIME });
                return res.status(200).json({ token });
            }
            
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging user:', error);
        return res.status(500).json({ error: `Failed to login user: ${error}` });
    }
}

module.exports = { register, login, authenticate };