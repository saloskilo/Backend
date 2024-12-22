const { Router } = require('express');
const User = require('../models/user');
const router = Router();


// open signin page 
router.get('/signin', (req, res) => {
    return res.render('signin') 
})

// open signup page 
router.get('/signup', (req, res) => {
    return res.render('signup') 
})

//create new user from sigup page
router.post('/signup', async (req, res) => {

    const { fullName, email, password } = req.body;
    await User.create({
        fullName, email, password
    })
    return res.redirect('/')
});

// login page to post into db check user if available
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.matchPassword(email, password);
    console.log(user)
    return res.redirect('/');
})




module.exports = router;