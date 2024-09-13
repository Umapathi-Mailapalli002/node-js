// const add = (a,b) =>{
//     return a+b;
// }
// const sub = (a,b) =>{
//     return a-b;
// }
// const div = (a, b) => {
//     if (b === 0) {
//         throw new Error('Division by zero is not allowed');
//     }
//     return a / b;
// }
// const mul = (a,b) =>{
//     return a*b;
// }
// const mod = (a,b) =>{
//     return a%b;
// }
// const sqr = (a) =>{
//     return a*a;
// }

// module.exports = {
//     add,
//     sub,
//     div,
//     mul,
//     mod,
//     sqr
// }; this format should be used for comman js then another alternate is used for ecma script

//echma script formate
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;
export const div = (a, b) => {
    if (b === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return a / b;
};
export const mul = (a, b) => a * b;
export const mod = (a, b) => a % b;
export const sqr = (a) => a * a;
