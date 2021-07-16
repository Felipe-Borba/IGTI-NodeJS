import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

ask();
function ask() {
    rl.question('type any number:', number => {
        const multiple = [];
        for (let i = 1; i < number; i++) {
            if ((i % 3 === 0) || (i % 5 === 0)) {
                multiple.push(i);
            }
        }
        
        if (parseInt(number) === -1) {
            rl.close();
        } else {            
            console.log(multiple);
            ask();
        }
    });
}