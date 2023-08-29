const express = require('express');
const shortid = require('shortid');
const Url = require('../models/Url');
const User = require('../models/User');
const { authenticateUser, generateToken, hashPassword, comparePasswords } = require('../middlewares/auth');

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
    const { username, password, name, email } = req.body;
  
    try {
        // Hash the provided password
        const hashedPassword = await hashPassword(password);

        // Create a new User instance with hashed password
        const newUser = new User({
            username,
            password: hashedPassword,
            name,
            email,
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success message
        res.json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
  
  // User login
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Retrieve user from database by username
      const user = await User.findOne({ username });

        if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
        }
      // Compare passwords
      const passwordsMatch = await comparePasswords(password, user.password);
  
      if (passwordsMatch) {
        const token = generateToken(user);
        res.json({ token, message: 'Authentication successful', user: req.user });
      } else {
        res.status(401).json({ error: 'Authentication failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Shorten URL
router.post('/shorten', authenticateUser, async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();
  
  try {
    const url = new Url({
      originalUrl,
      shortUrl,
    });

    await url.save();

    res.json({ originalUrl, shortUrl });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Invalid input' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Redirect to original URL
router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Update analytics (e.g., increment click count)
    url.clickCount += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
