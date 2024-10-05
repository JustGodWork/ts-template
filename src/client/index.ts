import 'reflect-metadata'; /* Required for decorators */
import { myAwesomeSharedContent } from "@public/core/myAwesomeSharedContent";

console.log('Hello from client!');
console.log(myAwesomeSharedContent.awesome);
console.log(myAwesomeSharedContent.shared);
console.log(myAwesomeSharedContent.content);

const emitter = new EventEmitter2();

emitter.on('example', (data: string) => {
    console.log(data);
});

emitter.emit('example', 'EventEmitter client successfully works!');
