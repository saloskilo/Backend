const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

const Blog = require('./models/blog');

const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const PORT = 8000;

// DB CONNECTION
mongoose
    .connect("mongodb://127.0.0.1:27017/blogify")
    .then(() => {
        console.log("mongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))


app.use(express.urlencoded({ extended: false })); // middleware for form data req.body 
app.use(cookieParser()); // middleware for cookie parser
app.use(checkForAuthenticationCookie('token')); // middleware for checking authentication cookie
app.use(express.static(path.resolve('./public'))); // middleware for serving static files

// home route
app.get('/', async(req, res) => {
    const blogs =await Blog.find({});
    const user = req.user;
    return res.render(('home.ejs'), { blogs, user });
})

app.use('/user', userRoute);  //signup 
app.use('/blog', blogRoute);  //add-new


app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`)
})