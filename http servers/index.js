import http from "http";
import fs from "fs";

const myServer = http.createServer((req,res) => {
    const log = `${Date.now()}: ${req.url} New Req Rec\n`;
    fs.appendFile("log.txt", log, (err, data)=> {
        // res.end("Hello from server");
        switch (req.url) {
            case "/": res.end("HomePage");
            break;
            case "/contact-us" : res.end("this page is not ready to see");
            break;
            case "/about" : res.end("Hey this is Ravi");
            break;
            default: res.end("404 error");
        }
    });
});

myServer.listen(5000, () => console.log("Server Started"));