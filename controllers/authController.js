const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

const passport = require('passport');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.cookie('user', JSON.stringify({ username: user.username }), { httpOnly: true });
      return res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
};


exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};

exports.getUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ username: req.user.username });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
