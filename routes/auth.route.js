const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // keep consistent filename

// Registration page
router.get('/registerpage', (req, res) => {
  res.render('register');
});

// Login page
router.get('/loginpage', (req, res) => {
  res.render('login');
});

// Register POST
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    await User.create({ username, email, password });

    // After successful registration, redirect to login page (clean UX)
    res.redirect('/loginpage');
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).send('Server error');
  }
});

// Login POST
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).send('Invalid email or password');

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(400).send('Invalid email or password');

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     // Set JWT as HttpOnly cookie, secure in production
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 3600000, // 1 hour
//     });

//     res.redirect('/dashboard');
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).send('Server error');
//   }
// });
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;  // changed from email to username
    console.log('Login attempt:', username);

    const user = await User.findOne({ username });  // find by username
    if (!user) {
      console.log('User not found');
      return res.status(400).send('Invalid username or password');
    }

    console.log('User found:', user.username);

    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).send('Invalid username or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });

    console.log('Login successful, token sent as cookie');

    res.redirect('/dashboard');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
});



// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  console.log("Logged out ");
  res.redirect('/');
});

module.exports = router;
