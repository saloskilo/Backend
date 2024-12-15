const shortnEW = require('shortid')
const URL = require('../models/url');

async function handleGenerateShortURL(request, response) {
    const body = request.body;
    if (!body.url) {
        return response.status(400).json({ errpr: 'Type URL for making it short' })
    }
    const shortID = shortnEW()

    await URL.create({
        shortid: shortID,
        redirectUrl: body.url,
        visitHistory: []
    });
    return response.json({ id: shortID })
}

module.export={
    handleGenerateShortURL,
}