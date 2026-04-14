
Project begins with running npm init
npm i express
node module folder, package, package-lock files are created
when we wrote npm i something, it will download from internet and put inside node module folder.
Noticing thing is as of now we did npm i for express, but in node module folder lots of folders are there, because we add dependency as a express, similarly inside node_module/express/package.json has many dependencies, so all the files are downloaded and kept inside the node_module folder.
package-lock.json diff between package.json -> 
