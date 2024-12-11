const http = require("http");
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    fs.appendFile('./logs.txt', `${req.headers.host}\n`, (err) => {
        console.log(err);
    })
    // console.log(req.headers);
    switch (req.url) {
        case '/':
            res.end("This is Home page")
            break;
        case '/about':
            res.end("This is Salman Ali");
            break;
        default: res.end("404 not found");
            break;
    }
    // res.end("Server is started again")

});

myServer.listen(8000, () => {
    console.log("Server is started");

})