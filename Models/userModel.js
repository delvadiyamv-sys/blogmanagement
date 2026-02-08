 const express = require('express');
const mongoose = require('mongoose');   
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },   
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Number, default: 0 }, // 0 for user, 1 for admin  
    createdAt: { type: Date, default: Date.now }
    
});
const User = mongoose.model('User', userSchema);
module.exports = User;  