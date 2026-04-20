
Project begins with running npm init
npm i express
node module folder, package, package-lock files are created
when we wrote npm i something, it will download from internet and put inside node module folder.
Noticing thing is as of now we did npm i for express, but in node module folder lots of folders are there, because we add dependency as a express, similarly inside node_module/express/package.json has many dependencies, so all the files are downloaded and kept inside the node_module folder.
package-lock.json diff between package.json -> 


npm i nodemon-g
nodemon src/app.js

  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
--in the package.json file we can modify like this also
so instead of running nodemon src/app -> we can run npm run dev







const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

---this 3 lines of code create a server and it will start running in port 3000





const express = require('express');

const app = express();

app.use((req, res)=> {
    res.send('Hello from server')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

--- Now in the browser we can see this text Hello from server





const express = require('express');

const app = express();

app.use("/test", (req, res)=> {
    res.send('Hello from Test')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

-Now in the browser http://localhost:3000/test -> this will print Hello from Test





const express = require('express');

const app = express();

app.use("/test", (req, res)=> {
    res.send('Hello from Test')
})

app.use("/test2", (req, res)=> {
    res.send('Hello from Test 2')
})

app.use("/", (req, res)=> {
    res.send('Hello from server')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

---Here this is how the routing order should follow, '/' should place in the last part




instead of app.use -> app.get, app.post is recommended
because in app.use in postman putting get/post/delete all will work, but when we restrict to methods like get it wont work in post




app.get("/ab?c", (req, res)=> {
    res.send('Hello from Test')
})
--when writing like this will work for /abc and /ac

app.get("/ab+c", (req, res)=> {
    res.send('Hello from Test')
})
--it will work like abc, abbbbbc, abbbbbbbbbc



app.get("/ab*cd", (req, res)=> {
    res.send('Hello from Test')
})
--it will work like abcd, abRAVIcd, so anything in between ab and cd will work, but if we writing like abRAVIDSNASDc -> this wont work, because here pattern is mismatching





app.get("/a(bc)?d", (req, res)=> {
    res.send('Hello from Test')
})
--abcd and ad will work




app.get("/a(bc)+d", (req, res)=> {
    res.send('Hello from Test')
})
--abcd and abcbcbcbcd will work



app.get(/a/, (req, res)=> {
    res.send('Hello from Test')
})
--anywhere in the url contains a it will work, like 'cab', cb->will fail




app.get(/.*fly$/, (req, res)=> {
    res.send('Hello from Test')
})
---this regex meaning url starts with anything and ends with fly 
fly, butterfly it will work, dragonfly1 -> it will fail





if I am having query param
http://localhost:3000/user?userId='123'&suername='ravi'
app.get("/user", (req, res)=> {
    console.log(req.query);
    res.send('Hello from Test');
})




http://localhost:3000/user/102'
app.get("/user/:userId", (req, res)=> {
    console.log(req.params);
    res.send('Hello from Test');
})

http://localhost:3000/user/102/ravi/12'
app.get("/user/:userId/:username/:rollNumber", (req, res)=> {
    console.log(req.params);
    res.send('Hello from Test');
})




app.get("/ab?c", (req, res)=> {
    
})
--if i am not sending anything in the app.get / app.use means it run for infinite times, in postman it will load continues,




app.get("/user", (req, res, next) => {
    console.log('');
    next();
},
    (req, res) => {
        res.send('Hello from Response 2')
    }
)
----- it will handle multiple responses like this when we use next, next is coming from express


app.get("/user", (req, res, next) => {
    res.send('Hello from Response 1')
    next();
},
    (req, res) => {
        res.send('Hello from Response 2')
    }
)
----- here it will throw error, because for one url one res is possible, here we are trying 2 response for 1 req, so it will error
so this is not recommended





app.get("/user", (req, res, next) => {
    next();
    res.send('Hello from Response 1')
},
    (req, res) => {
        res.send('Hello from Response 2')
    }
)
--if i am writing like this, first it see next and it will execute 2nd response and line by line code execution when it read first response throws error




use() → for middleware, works on paths + subpaths
all() → for route handling, works on one exact route (all methods)









