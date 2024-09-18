// var generateName = require("sillyname");
// var sillyname = generateName();

// console.log(`My name is ${sillyname}.`);
//The above code is in the comman js formate

//the above syntex is in the the CJS format which is stand for a common javascript
//it means the earlier versions of node is use the comman javascipt then ex:- it uses variable and a require keyword
// from the version 12 of node it move to little bit as using echma script in this a import is used

import generateName from "sillyname";
var sillyname = generateName();
console.log(`My name is ${sillyname}.`);

//task is to generate the superhero name like in the above generated a random name
//need to install a superhero names npm package

//ans
import {randomSuperhero} from "superheroes";
const superHero = randomSuperhero();
console.log(`I am a ${superHero}!`);

//task2 to genrate a qr on the basis of the text
import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";
inquirer
  .prompt([
    {
        message:"Type in your URL: ", 
        name: "URL"
    }
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
qr_svg.pipe(fs.createWriteStream('qr_image.png'));
fs.writeFile("url.txt",url, (err) =>{
    if(err) throw err;
    console.log("The file has been saved!");
});
})
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

  