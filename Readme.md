#AngularJS FrontEnd Example

##Introduction

This repo contains an example of AngularJS frontend consuming data from RestFul server.

## Purpose
The main goal is to learn how to build an AngularJS CRUD app running in a master page (Single Page Application) in which there is a layer whose contents will change depending on the status of the application. Also presents the complexity of which in turn has a three-layer model, since it has presentation (Bootstrap, JQuery), business (Angularjs) and model (Restful Server).

When a user sends his credentials, the backend server checks that they are correct and answers with a unique token built with the user informations.
The endpoint is restricted to authenticated users, the server checks the validity of the token and returns the data if the token is valid or a status error code.

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager.
* Nodemon - Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development. [Official Website](http://nodemon.io/).

```bash
$ npm install -g nodemon
```

## Application Requirements

* AngularJS - Angular's [Official Website](http://angularjs.org/) is a great starting point. You can also use [Thinkster Popular Guide](http://www.thinkster.io/), and the [Egghead Videos](https://egghead.io/).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

```bash
$ npm install -g bower
```

* Gulp - Gulp is a toolkit that will help you automate painful or time-consuming tasks in your development workflow. For web development (if that's your thing) it can help you by doing CSS preprocessing, JS transpiling, minification, live reloading, and much more. [Official Website](http://gulpjs.com/).

```bash
$ npm install -g gulp
```

## Setup the project

Download the project:

```bash
$ git init
```

```bash
$ git clone https://github.com/marceloquirozfrias/javascript-frontend.git
```

All Node applications will start with a package.json file so let’s begin with that.

```bash
$ npm install
```

Bower install too (look at .bowerrc and bower.json files):
```bash
$ bower install
```

Then we need start the server:

```bash
$ gulp
```

If you need a server, I recommend the backend part of this example:
[backend] (https://github.com/marceloquirozfrias/javascript-backend)

##Further Reading
* [Architecting a Secure RESTful Node.js app] (http://thejackalofjavascript.com/architecting-a-restful-node-js-app/)
* [NodeJs Backend Restful Server] (https://github.com/marceloquirozfrias/javascript-backend)