/*
 
why node js
In the beginning apache server was used to run js on server but it was not efficient and fast as it was single threaded and blocking. 
So Ryan Dahl created node js which is built on chrome v8 engine and it is non blocking and event driven.

Node JS is written in c++
V8 engine is written in c++
Node JS is built on top of V8 engine


In other words
Node js is a c++ application with v8 embedded into it


v8 is a c++ code?
basically computer understands only binaries, 0 and 1
we written in the JS -> c++ (JS engine) converts to High level language -> Low level language (machine code / Assembly code) -> binary

Node JS is a JS Runtime environment and behind the scenes it is using JS engine

//---
In Browser we console we write window. ,  this. ==> these 2 belongs to browsers not with JS engine
But global is belongs to node js
in vs code console if we write window. it will give error but if we write global. it will work because global is a global object in node js and window is a global object in browser
and it will have setTimeout, setInterval...

in node env we have global
in browser env we have window, this, self, frames
so lots of confusions happens so they standardized the global object and they called it globalThis
globalThis works in both browser and node


function a () {
    const x = ;
    function b () {
        console.log('');
    }
}

console.log(x); // error because x is not defined in global scope
in a same way module also works in node, we can't access it outside

require("./path")
all the code of the modules is wrapped inside the function
and this function is not normal function it is IIFE (Immediately Invoked Function Expression)
IIFE - code is more secure and private

module and require are parameters of the IIFE function
(function (module, require) {
    code of the module
})(module, require)



there are 5 steps to load a module in node js
# require(/path)
1. Resolving the module 
    -> ./localpath
    -> .json
2. Loading the module
3. Wrapping the module code in IIFE
4. Evaluating the module code -> module.exports
5. Caching the module -> if we require the same module again it will return the cached version of the module


So whatever we written in nodejs, it will first pass to IIFE and it will be pass into V8





NodeJS has an event-driven architecture capable of asynchronous I/O.
JS is sync single threaded

example
function a () {}
a()
console.log('hello')

so this is a sync code



if api call, setTimeout all are when involve it becomes async code
and behind the scenes it will tunes async code with the help of libuv 


*/

