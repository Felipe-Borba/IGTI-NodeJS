//import { promises } from 'dns';
import { promises } from 'fs';
import fs from 'fs';
import asyncFunc from './asyncFunc.js';

const key = 4;
switch (key) {
    case 1:
        console.log('1');
        fs.writeFile('1-6-2/test.txt', 'something', function (err) {
            console.log('2');
            if (err) {
                console.log(err);
            } else {
                fs.appendFile('1-6-2/test.txt', ' else\n', (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('file successfully written');
                        fs.readFile('1-6-2/test.txt', 'utf-8', (err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(data);
                            }
                        });
                    }
                });
            }
        });
        console.log('3');

        break;

    case 2:
        try {
            console.log('1');
            fs.writeFileSync('1-6-2/test.txt', 'something');
            console.log('2');
            const data = fs.readFileSync('1-6-2/test.txt', 'utf-8')
            console.log('data');
            console.log('3');
        } catch (error) {
            console.log(error);
        }

        break;

    case 3:
        promises.writeFile('1-6-2/test.txt', 'something').then(() => {
            promises.appendFile('1-6-2/test.txt', ' else\n').then(() => {
                promises.readFile('1-6-2/test.txt', 'utf-8').then((data) => {
                    console.log(data);
                }).catch(err => {
                    console.log('1:',err);
                });
            }).catch(err => {
                console.log('2:',err);
            });
        }).catch(err => {
            console.log('3:',err);
        });
        break;

    case 4:
        asyncFunc();
        break;

    default:
        console.log('invalid key');
        break;
}