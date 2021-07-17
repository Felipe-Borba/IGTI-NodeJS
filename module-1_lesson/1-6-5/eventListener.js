import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('testEvent', obj => {
    console.log(obj,'in external file');
});

export default eventEmitter;