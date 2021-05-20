var fs = require('fs');

//readFileSync

console.log('Before');
var result = fs.readFileSync('./sample.txt','utf8');
console.log(result);
console.log('After');

//Async

console.log('Before');
fs.readFile('./sample.txt','utf8',function(err,result){
    console.log(result);
});

console.log('After');