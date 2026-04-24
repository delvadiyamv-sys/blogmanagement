const express= require('express');
const user_router = express();
const UserController = require('../Controllers/user_controller');
const AdminAuth= require('../middleware/adminloginAuth') // Import the UserController
// Set view engine
user_router.use(express.json());
user_router.use(express.urlencoded({ extended: true }));    
const session = require('express-session');
user_router.use(session({
    secret: 'mvpatelsecretkey',
    resave: false,
    saveUninitialized: true
}));
user_router.set('view engine', 'ejs');
user_router.set('views', "./View");


user_router.get('/login', AdminAuth.isLogout, UserController.login); 
user_router.get('/register', AdminAuth.isLogout, UserController.register); // Define the route for user registration
user_router.post('/login', AdminAuth.isLogout, UserController.loginUser); 
user_router.post('/register', AdminAuth.isLogout, UserController.registerUser); 
user_router.get('/profile', AdminAuth.isLogout, UserController.profile); // Define the route for user profile
user_router.get('/about', AdminAuth.isLogout, UserController.Aboutus); // Define the route for about us page    
user_router.get('/contact', AdminAuth.isLogout, UserController.Contactus); // Define the route for contact us page
module.exports = user_router;
