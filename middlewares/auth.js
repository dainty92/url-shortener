const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
    // Get the token from the request header or query parameter
    const token = req.header('x-auth-token') || req.query.token;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, secretKey);
  
      // Attach the decoded data to the request object for later use
      req.user = decoded;
  
      // Continue to the next middleware
      next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { authenticateUser, generateToken, hashPassword, comparePasswords };
