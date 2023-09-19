const express = require('express');
const mongoose = require('mongoose');
const authRoutes= require("./routes/authRoutes.js")
const cookieParser = require("cookie-parser")
const {requireAuth} = require("./middleware/authMiddleware.js")
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://127.0.0.1:27017/Auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/',requireAuth, (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoutes)

app.listen(5000,()=>{
    console.log("server working")
})