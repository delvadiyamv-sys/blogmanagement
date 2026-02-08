const express = require('express');
const User = require('../Models/usermodel'); // Import the User model
class UserController {
  static login(req, res) {
    //
    res.render('login'); // Render the login view
  }
  //login user
  static async loginUser(req, res) {
    const email = req.body.email; // Get email and password from request body
    const password = req.body.password;
    try {
      const user = await User.findOne({ email: email, password: password }); // Find user by email and password
      if (user) {
        req.session.user = user;
        req.session.userId = user._id; // Store user ID in session
        req.session.is_admin = user.is_admin; // Store admin status in session
        req.session.save(); // Store user in session
        if (user.is_admin == 1) {
          res.redirect('/dashboard');
        } else {
          res.redirect('/');
        }
      } else {
        res.render('login', { message: 'Invalid email or password' }); // Render login with error if user not found
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
}

module.exports = UserController;
