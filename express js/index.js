//express is a node js libery and it is actualy a js framework which is used to make resp apis and the http requests
//in previous one we saw that to handle the url paths and the http methods 
//we install that both module seperatly but in express they are built in that
//it provide the fuctions of http methods and url together
//but at the end the http and url module is in that which provide that functionalities together
//and we get it by install one package express that's the difference

import express from "express";
 const app = express();
const port = 5002;

app.get("/", (req, res) =>{
    return res.send("Hello from the HomePage");
});

app.get("/about", (req,res) => {
    return res.send(`Hey this is me ${req.query.name} and this is my id ${req.query.id}`);
});

app.listen(port, () => console.log("the server started"));