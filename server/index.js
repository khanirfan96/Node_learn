// const http = require('http');f
// const fs = require('fs');
// const url = require('url');
const express = require('express');


const app = express();

app.get('/', (req, res) => {
    return res.send("Hello Form Home page");
})

app.get('/about', (req, res) => {
    return res.send("Hello Form About page" + " hey " + req.query.name + " your age is " + 
        req.query.age
    );
})

// const firstServer = http.createServer((req, res) => {
//     if (req.url == '/favicon.ico') res.end();
//     console.log('New Req Received');
//     const log = `${Date.now()}: ${req.method} ${req.url} New request received \n`;
//     const myurl = url.parse(req.url, true);
//     console.log(myurl);
//     fs.appendFile('log.txt', log, (err, data) => {
//         switch (myurl.pathname) {
//             case '/':
//                 res.end("Hey Hi Learner... Be discplined !");
//                 break;
//             case '/about':
//                 const userName = myurl.query.name
//                 res.end(`Hey Hi ${userName}`);
//                 break;
//             case '/search':
//                 const search = myurl.query.search;
//                 res.end('Here are ur results for' + search);
//             default: res.end("404 Not Found");
//         }
//     })
// });
// const firstServer = http.createServer(app);
// firstServer.listen(5000, () => console.log("Server Started!"));


app.listen(5000, () => console.log("Server Started!"));