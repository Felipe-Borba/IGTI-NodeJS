console.log('Hello World!');

//console.log(process.argv);
const input = parseInt(process.argv[2]);
const multiple = [];
for (let i = 1; i < input; i++) {
    if ((i % 3 === 0) || (i % 5 === 0)) {
        multiple.push(i);
    }
}
console.log(multiple);