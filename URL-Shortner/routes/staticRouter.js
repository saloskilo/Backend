const express = require("express");
const router = express.Router()




// ejs rendor // server side render home page
router.get('/',async (req,res) => {
    const allurls=await URL.find({});
    return res.render('home',{
      urls:allurls
    })
  }) 

  // sign up page
  router.get('/signup',(req,res)=>{
    return res.render('signup')
  })

   // sign up page
   router.get('/login',(req,res)=>{
    return res.render('login')
  })
module.exports= router
