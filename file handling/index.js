const { error } = require("console");
const fs = require("fs");
//to create the file in a synchronous way
// fs.writeFileSync("./test.txt", "hello this module is about the file handling in the node js");

//to create file in a Async way 
// fs.writeFile("./test.txt","hey this is a async way to create a file in the node js",(error) => {
//     if(error)  throw error;
    
// });

//to read the file in Async manner
// fs.readFile("./contact.txt","utf-8",(error,data) => {
//        if(error)  throw error;
//         console.log(data);
//     });
//to read the file in sync manner
// const data = fs.readFileSync("./contact.txt","utf-8");
// console.log(data);


/*
    Note:- there are two ways on reading file creating etc. one is sync methode and another one is async methode
    but the difference in both is that in async one it should take the callback as it last peramiter 
    and sync one is not required

    async is void type function and sync one is return type function

*/
// const date = new Date();
// const day = date.getDate();
// const month = date.getMonth();
// const year = date.getFullYear();
// const seconds = date.getSeconds();
// const minutes = date.getMinutes();
// const hours = date.getHours();

// const time = `${hours}:${minutes}:${seconds}`;

// const timestamp = `${time} ${day}/${month+1}/${year}`

// fs.appendFileSync("./test.txt", `${timestamp} hey there\n`);

const os = require("os");

console.log(os.cpus().length);