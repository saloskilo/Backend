const express = require("express");
const router = express.Router()

// ejs rendor // server side render
router.get('/',async (req,res) => {
    const allurls=await URL.find({});
    return res.render('home',{
      urls:allurls
    })
  }) 

module.exports= router
