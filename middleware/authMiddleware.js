const jwt = require("jsonwebtoken");
const User = require("../model/UserModel")

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token is required.' });
        
    } 
    await jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
      // If token is valid, decode the payload and attach it to the request object
      req.user = decoded;
      next(); // Proceed to the next middleware/controller
    });
    
};



module.exports = { authMiddleware };