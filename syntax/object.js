
// Object - No orders
// Array = orders

// array
var members = ['rocky','egoing','hoya'];
console.log(members[1]); // egoing

// object
var roles = {
    'promgrammer' : 'rocky',
    'designer' : 'egoing',
    'manager' : 'hoya'
}
console.log(roles.designer); // egoing
console.log(roles['designer']);

for(var role in roles){
    console.log('object => ',role,'value => ',roles[role]);
}

// Object Oriented Programming

// statements (if,while...) can't be a value
// But, function can be a value
var f = function(){
    console.log(1+1);
}
console.log(f); // print of the f funtion (Not calling)
f(); // call f function
var a = [f];
a[0](); 

var o ={
    func:f
}
o.func();

///////////////////////////////
// This situation, when someone changes the f1, it can't be printed out in a intended way
var o = {
    v1:'v1',
    v2:'v2'
}
function f1(){
    console.log(o.v1);
}

function f2(){
    console.log(o.v2);
}
f1();
f2();

// So, functions can be add into O object

var o2 ={
    v1: 'v1',
    v2: 'v2',
    f1: function(){
        console.log(this.v1);
    },
    f2: function(){
        console.log(this.v2);
    }
}

o2.f1();
o2.f2();
