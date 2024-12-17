const express = require("express");
const mongoose = require("mongoose");
const path=require('path');
const staticRoute=require('./routes/staticRouter')
const { connectDB } = require("./dbConnection");
const urlRoute = require("./routes/url.route");
const URL=require('./models/url') // import URL 
const app = express();

const PORT = 8000;

// DB CONNECTION 
mongoose
  .connect("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

// EJS Engine for server side render 
app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

//   MIDDLWARE THAT EXPECT JSON DATA IN THE REQUEST BODY 
app.use(express.json());

app.use(express.urlencoded({extended: false}))

// ejs rendor // server side render
app.get('/',async (req,res) => {
  const urls =await URL.find({});
  return res.render('home',{
    urls 
  })
})

  ////  
// Post a new SHORT-URL 
app.post("/", async (request, response) => {
  const body = request.body;
  if (!body.url) {
    return response.status(400).json({ errpr: "Type URL for making it short" });
  }
  const shortID = shortnEW();

  await URL.create({
    shortid: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  console.log("short id is : " + shortID);
  
  return response.render('home',{id: shortID});

});

// gET A URL WITH SPECIFIC ID 
app.get("/url/:shortid", async (request, response) => {
  const shortid = request.params.shortid;
  const entry = await URL.findOneAndUpdate(
    { shortid },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  response.redirect(entry.redirectUrl);
});

// GET THE CLICK OF ALL THE SHORTCLICK 
app.get("/analytic/:shortid", async (request, response) => {
  const shortid = request.params.shortid;
  const result = await URL.findOne({ shortid });
  console.log(result);
  response.json({ totalClick: result.visitHistory.length });
});

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
});
