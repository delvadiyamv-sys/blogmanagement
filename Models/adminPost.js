 const { urlencoded } = require('body-parser');
const express =require('express');
 const mongoose = require('mongoose');
const { lookupService } = require('node:dns');
    const postSchema = new mongoose.Schema({
      title: { type: String, required: true },
      content: { type: String, required: true },
      image: { type: String, default: "", required: false },
      comments: { type: Object, default: {} },
      Views: { type: Number, default: 0 },
      likes: { type: Number, default: 1 },
      dislikes: { type: Number, default: 1 },
      createdAt: { type: Date, default: Date.now }
    });
    const Post = mongoose.model('Post', postSchema);
    module.exports = Post;