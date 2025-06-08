const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoute = require('./routes/auth.route');
const dbconnect = require('./config/db');
const verifyToken = require('./middleware/auth');
const uploadRoute = require('./routes/upload.route'); //  NEW: Upload system

const PORT = process.env.PORT || 8080;

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(express.static('public')); // original way
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// database connection
dbconnect();

// i will create a home route now
app.get('/', (req, res) => {
    console.log("to home page ");
    res.render('home', { successMsg: "" });
});

// protected dashboard route
app.get('/dashboard', verifyToken, (req, res) => {
    res.render('dashboard', { user: req.user });
});

// ab ye kahega ki jitni bhi ayegi / unpe mount krdo authRouter wali reqs
app.use('/', authRoute);

// Upload route mounting
app.use('/upload', uploadRoute);

app.listen(PORT, () => {
    console.log(`listening to port ${process.env.PORT}`);
});
