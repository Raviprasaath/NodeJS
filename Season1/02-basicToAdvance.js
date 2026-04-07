/*
 
const crypto = require("node:crypto");
const crypto = require("crypto");

both are same
crypto is a built in module in node js
like crypto many other modules are there like fs, os, console, path....

for example we need to create a password
crypto.pbkdf2("password", "salt", 100000, 64, "sha512", (err, derivedKey) => {
    if (err) throw err;
    console.log(derivedKey.toString("hex"));
}

pbkdf2 is a async function so it will not block
pbkdf2sync is a sync function so it will block the event loop
when the sync word is there it will block
and async function only have a call back

pbkdf2sync("password", "salt", 100000, 64, "sha512") // it will return the derived key


so NodeJS has two things inside it v8 engine and libuv

*/