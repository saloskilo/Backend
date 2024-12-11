// const http = require("http");
// const fs = require('fs');
// const url=require('url')


// function handler(req, res) {
//     fs.appendFile('./logs.txt', `${req.url}\n`, (err) => {
//         console.log(err);
//     })
//     const myURL=url.parse(req.url,true);
//     console.log(myURL);
//     switch (myURL.pathname) {
//         case '/':
//             res.end("This is Home page")
//             break;
//         case '/about':
//             const userName=myURL.query.myname;
//             res.end(`This is ${userName}`);
//             break;
//         default: res.end("404 not found");
//             break;
//     }
//     // res.end("Server is started again")

// }
// const myServer = http.createServer(handler);

// myServer.listen(8000, () => {
//     console.log("Server is started");

// })






// ------------------------------Express Started ------------------------------//
const express = require('express');
const app = express();


app.get('/', (req, res) => {
    return res.end(`'This is Home Page '${req.query.myname}`)
});


app.get('/about', (req, res) => {
    return res.end('This is about  Page')
});

app.listen(8000, () => {
    console.log("Server Started");
})