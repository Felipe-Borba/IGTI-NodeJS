import { promises as fs } from "fs";

writeReadJson();

async function writeReadJson() {
    const objects = {
        obj: ['obj1', 'obj2', 'obj3']
    };

    try {
        await fs.writeFile('1-6-3/test.json', JSON.stringify(objects));
        const data = JSON.parse(await fs.readFile('1-6-3/test.json'));
        data.obj.push('test');
        console.log(data);
        await fs.writeFile('1-6-3/test.json', JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}