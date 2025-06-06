const express = require('express');
const dotenv = require('dotenv');


dotenv.config();
const app = express();

app.use(express.static('public'));
app.set('view engine','ejs');

// i will create a home route now
app.get('/',(req,res)=>{
    console.log("to home page ");
    res.render('home');
});

app.listen(process.env.PORT,()=>{
    console.log("listening to port ");
});