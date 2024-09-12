const { ifError } = require("assert");
const fs = require("fs");

// fs.writeFile("message.txt","hello from node js", (err)=>{
//     if (err) throw err;
//     console.log("The file has been saved!");
// });


//read the file 
fs.readFile("./message.txt","utf8", (err, data) =>{
    if(err) throw err;
    console.log(data);
});