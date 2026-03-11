// var, let, const - line-by-line comparision

var a = 12;  //not at all used
let a = 40; //can be changed
const discount = 12; //it has the fixed value like pi that cannot be changed once ot has been given

// Scope (global, block, functional)

var a = 12; //global

{
    var b = 12; //block
}

function abcd() {
    if(true) {
        let a = 10;
    }
}

//reassignment, redeclaration

var a = 10;
a = 20
var a = 233; //fine

let b = 30;
b = 40;

let b = 50; //error

//Temporal Dead Zone

let a = 12;
console.log(a);

// Hoisting impact per type

console.log(a);
// var a = undefined;
// a = 12;
var a = 12;

var x =1;
{
    var x =2;
}
console.log(x);
