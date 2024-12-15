const mongoose = require('mongoose')


async function connectDB(URL) {
    return mongoose.connect(URL)
}


module.exports = { connectDB ,}