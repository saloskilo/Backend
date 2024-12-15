const express = require("express");
const shortnEW = require("shortid");
const URL = require("../models/url");

const { handleGenerateShortURL } = require("../controllers/url.controller");

const url_router = express();

url_router.post("/", async (request, response) => {
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
  return response.json({ id: shortID });
});

url_router.get("/:shortid", async (request, response) => {
  const shortid = request.params.shortid;
  const entry = await URL.findOneAndUpdate(
    { shortid },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  response.redirect(entry.redirectUrl);
});


url_router.get("/analytic/:shortid", async (request, response) => {
    const shortid = request.params.shortid;
    const result = await URL.findOne({shortid});
    console.log(result)
    response.json({totalClick:result.visitHistory.length})
  });


module.exports = url_router;
