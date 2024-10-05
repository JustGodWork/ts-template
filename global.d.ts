import { EventEmitter2 as EventEmitter } from 'eventemitter2';

declare global {
    /**
     * Global variable. Built-in event emitter from CFX
     * @see https://github.com/citizenfx/fivem/blob/master/data/shared/citizen/scripting/v8/eventemitter2.js
     */
    const EventEmitter2: typeof EventEmitter;
    /**
     * Global variable. Will tell you if the code is running on the server.
     */
    const IS_SERVER: boolean;
    /**
     * Global variable. Will tell you if the code is running on the client.
     */
    const IS_CLIENT: boolean;
    /**
     * Global variable. Will tell you if the code is running in production.
     */
    const IS_PRODUCTION: boolean;
}
