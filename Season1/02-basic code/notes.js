/*

There are 2 types of modules
1. CommonJS Modules (cjs)
    -> module.exports
    -> require()

    -> by default used in node js
    -> older way
    -> synchronous loading of modules
    -> non strict mode 
        for example we assigning z = 5 without declaring it with var, let or const it will not give error in non strict mode 

2. ES Modules (mjs)
    -> to change this need to create a package.json file and add "type": "module"

    ->import and export
    -> newer way
    -> asynchronous loading of modules
    -> strict mode by default (z=5 => will give error because z is not declared and it is a global variable which can cause problems)
    

*/