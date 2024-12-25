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

    try {
        const { email, password } = req.body;

        const token = await User.matchPasswordAndGenerateToken(email, password);
        console.log('Token:' + token);
        return res.cookie('token', token).redirect('/');

    } catch (error) {

        res.render('signin'),{
            error:'Incorrect Email or Password'
        }
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/');
})

module.exports = router;