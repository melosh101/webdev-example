# webdev-example

## what is this
this is an example of some of the stuff you learn to do during your course at RTS.
Altough the focus is on the frontend, i made a small backend along with an admin panel (comming soon) for sharing a greeting to the next people that'll come along and see this  

## How to run

### public frontend
its just static html, css and js, no bundling required.
it can be run by opening the file in your browser, live server, or using a server like nginx or apache

### backend

to install (this should install dependencies for the db package too, if not do it manually):
```sh
bun install
```
or
```sh
npm i
```

to build: <br/>
if you are using bun you dont need build
```sh
bun run build:server
```
or
```sh
npm run build:server
```

to run: <br/>
if using bun and didnt build
```sh
bun run server:bun
```
if you built
```sh
bun packages/server/dist/index.js 
```
with node:
```sh
npm packages/server/dist/index.js
```




This project was created using `bun init` in bun v1.1.43. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
