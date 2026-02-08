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


user_router.get('/login', AdminAuth.isLogout, UserController.login); // Define the route for user login
user_router.post('/login', UserController.loginUser); // Define the route for user login processing
module.exports = user_router;
