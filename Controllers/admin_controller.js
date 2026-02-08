const { log } = require('console');
const express = require('express');
const fs = require('fs'); 
const Post = require('../Models/adminPost'); // Import the Post model
class AdminController {
  static async blog(req, res) {
    try {
      const newPost = await Post.find({}); // Fetch all posts from the database
      res.render('blog', { newPost }); // Render the blog view with the fetched posts
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  static async loadPost(req, res) {
    
    const postId = req.params.id;
    try {
      const post = await Post.findOne({ _id: postId });
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.render('postDetail', { post: post });
    } catch (error) {
      console.error('Error loading post:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  static async addComment(req, res) {
    // Get comment data from request body
    const { name, email, comment, postId } = req.body;
    try {
      // Here you would typically save the comment to the database
      await Post.findByIdAndUpdate(postId, { $push: { "comments": { name, email, comment } } });
      console.log('New comment added:', { name, email, comment, postId });
      res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  static async dashboard(req, res) {
    try {
      const newPost = await Post.find({}); // Fetch all posts from the database
      res.render('admin/dashboard', { newPost: newPost }); // Render the admin dashboard view with the fetched posts
    } catch (error) {
      console.error('Error fetching posts for dashboard:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error during logout:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/login'); // Redirect to the login page after logout
    });
  }
  static Createposts(req, res) {
    res.render('admin/createpost'); // Render the create posts view
  }
  static async createPost(req, res) {
    const { title, content } = req.body; // Get post data from request body
    const image = req.file.filename; // Get the uploaded file's original name
    try {
      const newPost = new Post({ title, content, image }); // Create a new Post instance
      await newPost.save();
       res.send({success:true, message:'Post created successfully',_id:newPost._id, title:newPost.title, content:newPost.content, image:newPost.image
        
       });
      //res.render('admin/createpost', { message: 'Post created successfully', post: newPost });
      //console.log('Post created successfully:', newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  static async deletePost(req, res) {
    try {
      const id = req.body.id;
      await Post.deleteOne({ _id: id });
      const newPost = await Post.find({}); // Fetch all posts from the database
      res.render('admin/dashboard', { success: true, message: 'Post was deleted successfully',newPost }); // Render the admin dashboard view with the fetched posts
     
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).send({ success: false, message: error.message });
    }
  }
  static async editPost(req, res) {
    const postId = req.params.id;
    try {
      const post = await Post.findOne({ _id: postId });
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.render('admin/editpost', { post: post });
    } catch (error) {
      console.error('Error loading post for editing:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  static async updatePost(req, res) {
    
 try {
    var image;
    if(req.file){
      image = req.file.filename;
      var oldPost = await Post.findById(req.params.id);
      var oldImagePath = 'public/uploads/'+oldPost.image;
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    
      await Post.findByIdAndUpdate( req.params.id, {
        title: req.body.title,
        content: req.body.content,
        image: image
       
      });
    }
      
    
    else{

      await Post.findByIdAndUpdate( req.params.id, {
        title: req.body.title,
        content: req.body.content
       
      });
      image = null;
    }
   
  res.render('admin/dashboard', { message: 'Post updated successfully', newPost: await Post.find({}) });
  console.log('Post updated successfully');
 } catch (error) {  
  console.error('Error updating post:', error);
  res.status(500).send('Internal Server Error');
  
 }


}
}
module.exports = AdminController;