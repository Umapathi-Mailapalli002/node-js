//URL => Uniform Resource Locator
import http from "http";
import fs from "fs";
import url from "url";

const myServer = http.createServer((req,res) => {
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Req Rec\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data)=> {
        // res.end("Hello from server");
        switch (myUrl.pathname) {
            case "/": res.end("HomePage");
            break;
            case "/contact-us" : res.end("this page is not ready to see");
            break;
            case "/about" : res.end(`Hey this is ${myUrl.query.name} and this is my id ${myUrl.query.userId}`);
            break;
            default: res.end("404 error");
        }
    });
});

myServer.listen(5001, () => console.log("Server Started"));