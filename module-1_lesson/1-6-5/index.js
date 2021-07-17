import { EventEmitter } from 'events';
import listener from "./eventListener.js";
const eventEmitter = new EventEmitter();

eventEmitter.on('testEvent', obj => {
    console.log(obj);
});

eventEmitter.on('testEvent2', obj => {
    console.log(obj,'2');
});

listener.emit('testEvent', 'one more event');
eventEmitter.emit('testEvent', 'event');