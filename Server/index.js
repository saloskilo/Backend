const http = require("http");
const fs = require('fs');
const url=require('url')

const myServer = http.createServer((req, res) => {
    fs.appendFile('./logs.txt', `${req.url}\n`, (err) => {
        console.log(err);
    })
    const myURL=url.parse(req.url,true);
    console.log(myURL);
    switch (myURL.pathname) {
        case '/':
            res.end("This is Home page")
            break;
        case '/about':
            const userName=myURL.query.myname;
            res.end(`This is ${userName}`);
            break;
        default: res.end("404 not found");
            break;
    }
    // res.end("Server is started again")

});

myServer.listen(8000, () => {
    console.log("Server is started");

})