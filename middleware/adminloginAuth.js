const express = require('express');
class AdminAuth {
    static isLogin(req, res, next) {
        if (req.session.user && req.session.is_admin==1) {
            return next(); // User is logged in and is an admin, proceed to the next middleware
        } else {
            res.redirect('/login'); // Redirect to login if not logged in or not an admin
        }
    }
    static isLogout(req, res, next) {
        if (req.session.user && req.session.is_admin==1) {
            res.redirect('/dashboard'); // Redirect to dashboard if already logged in as admin
        } else {
            return next(); // Proceed to the next middleware if not logged in
        }
    }
}

module.exports = AdminAuth;
