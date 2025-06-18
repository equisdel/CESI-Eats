const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Obtiene la clave secreta de las variables de entorno

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
        req.user = decoded; // Attach the user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error verifying token:', error); // Añadimos log para debug
        res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware; 