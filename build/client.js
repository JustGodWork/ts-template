(()=>{"use strict";console.log("Hello from client!"),console.log("Awesome"),console.log("Shared"),console.log("Content");const e=new EventEmitter2;e.on("example",(e=>{console.log(e)})),e.emit("example","EventEmitter client successfully works!")})();