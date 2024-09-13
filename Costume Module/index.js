// const math = require("./customeModule.js") this is comman js syntax
//and in the below the echma script syntax

// const math = require("./customeModule.js")
// console.log(math.add(2,3)); this is in normal comman js format


import * as customeModule from './customeModule.js';

console.log(customeModule.add(3,2));
console.log(customeModule.sub(3,2));
console.log(customeModule.mul(3,2));
console.log(customeModule.div(3,2));
console.log(customeModule.mod(3,2));
console.log(customeModule.sqr(3,2));
