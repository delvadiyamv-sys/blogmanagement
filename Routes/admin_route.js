const express = require('express');
const admin_router = express();
const path = require('path');
const AdminController = require('../Controllers/admin_controller');
const AdminAuth = require('../middleware/adminloginAuth'); // Import the AdminAuth middleware
const multer = require('multer');
const bodyParser = require('body-parser');
admin_router.use(express.json());

admin_router.use(express.urlencoded({ extended: true }));
admin_router.use(bodyParser.json());
admin_router.use(express.static('public/uploads'));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const session = require('express-session');

admin_router.use(session({
    secret: 'mvpatelsecretkey',
    resave: false,
    saveUninitialized: true
}));
//set view engine
admin_router.set('view engine', 'ejs');
admin_router.set('views', "./View");


admin_router.get('/', AdminAuth.isLogout, AdminController.blog);
admin_router.get('/post/:id', AdminAuth.isLogout, AdminController.loadPost);
admin_router.post('/comment', AdminAuth.isLogout, AdminController.addComment);



admin_router.post('/delete', AdminAuth.isLogin, AdminController.deletePost);
admin_router.get('/dashboard', AdminAuth.isLogin, AdminController.dashboard);
admin_router.get('/logout', AdminAuth.isLogin, AdminController.logout);
admin_router.get('/Createposts', AdminAuth.isLogin, AdminController.Createposts); // Define the route for creating posts
admin_router.post('/post', upload.single('image'), AdminAuth.isLogin, AdminController.createPost); // Define the route for processing post 
admin_router.get('/editpost/:id', AdminAuth.isLogin, AdminController.editPost); // Define the route for editing posts
admin_router.post('/updatepost/:id', upload.single('image'), AdminAuth.isLogin, AdminController.updatePost); // Define the route for updating posts

module.exports = admin_router;