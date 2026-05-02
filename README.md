setting up the server


cd backend
$ npm install --save-dev @types/node @types/express
$ npm i express jsonwebtoken cookie-parser cors colors bcryptjs mongoose -D  typescript ts-node @types/express @types/node


package json for backend 
{
  "name": "y",
  "version": "1.0.0",
  "description": "a smart pharmacy inventory management system",
  "keywords": [
    "pharmacy",
    "inventory",
    "system"
  ],
  "homepage": "https://github.com/SadiqDev-stack/smartpharm#readme",
  "bugs": {
    "url": "https://github.com/SadiqDev-stack/smartpharm/issues"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/SadiqDev-stack/smartpharm.git"
  },
  "license": "ISC",
  "author": "sadiq cyber",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "test": "npm test",
    "start": "tsc && node --env-file=.env ./dist/server.js"
  },
  "devDependencies": {
    "@types/express": "^5.0.6",
    "@types/node": "^25.6.0",
    "bcryptjs": "^3.0.3",
    "colors": "^1.4.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.6.1",
    "ts-node": "^10.9.2",
    "typescript": "^6.0.3"
  }
}


for the frontend
setup
npm create vite@latest frontend
React + TypeScript


cd frontend
npm i
 

running 
cd ..
npm install -D concurrently
package.json
