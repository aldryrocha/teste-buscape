# @aldryrocha' Teste Buscapé

This is a old challenge to a job opportunity as a front-end developer at Buscapé company, made with [HTML5, SASS and Vanilla JS, bundled with Webpack]. 
The test was posted on github [frontend-challenges]([https://github.com/felipefialho/frontend-challenges](https://github.com/buscape-company/exercicios/tree/master/frontend)) 

## Installing

If you want to install this project locally and make changes, follow these three very simple steps:

```bash
$ git clone git@github.com:aldryrocha/teste-buscape
$ cd teste-buscape
$ npm i
```

Now you have this repo in your local machine! Let's run [Webpack](https://webpack.js.org/) and start making changes

```bash
$ npm start
```

Now the Teste Buscapé wil be live on [localhost:8080](http://localhost:8080). You can edit anything, save it, and your browser will reload the page to show your changes.

By default, the server will only respond to requests from localhost.

## Server data

Since we have the data.json to be load as a server, you need to run the json-server for it
```bash
$ json-server --watch db.json
```

## Building and deploying

To build a production-ready version of the project, run:

```bash
$ npm run build-dev
or
$ npm run build-prod
```
