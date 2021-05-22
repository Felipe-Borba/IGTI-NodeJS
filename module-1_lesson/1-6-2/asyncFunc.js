import { promises } from "fs";
export default async function asyncFunc() {
    try {
        await promises.writeFile('1-6-2/test.txt', 'something');
        await promises.appendFile('1-6-2/test.txt', ' else\n');
        const data = await promises.readFile('1-6-2/test.txt', 'utf-8');
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}