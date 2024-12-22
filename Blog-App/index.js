const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./routes/user')

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


app.use(express.urlencoded({extended:false})); // middleware for form data req.body 

app.get('/', (req, res) => {    
    return res.render('home.ejs')
})

app.use('/user', userRoute);  //signup 


app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`)
})