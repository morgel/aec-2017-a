'use strict';

// 3rd-party dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Application config
const LOCAL_APP_PORT = 8080;
const PUBLIC_APP_PORT = process.env.PUBLIC_APP_PORT || LOCAL_APP_PORT;
const host = process.env.MONGO_HOST; // from Docker
const port = process.env.MONGO_PORT; // from Docker
const url = 'mongodb://' + host + ':' + port + '/dev';

// Sanity check for debugging
console.log("local app port:", LOCAL_APP_PORT);
console.log("public app port:", PUBLIC_APP_PORT);
console.log("db host:", host);
console.log("db port:", port);

// Set up a global mongodb connection
mongoose.connect(url);
mongoose.Promise = global.Promise;
global.db = mongoose.connection;

// Express middleware
app.use(bodyParser.json()); // for parsing application/json

// Includes
var projectCtrl = require('./controller/projectController');
var usertCrl = require('./controller/userController');


app.get('/', function (req, res) {
    res.send("Welcome to exercise 3: MongoDB backend");
});

// Projects routes
app.get('/projects', projectCtrl.index);
app.get('/projects/:id', projectCtrl.read);
app.post('/projects', projectCtrl.create);
app.put('/projects', projectCtrl.update);
app.delete('/projects', projectCtrl.delete);

// User routes
app.get('/users', usertCrl.index);
app.get('/users/:id', usertCrl.read);
//app.get('/users/:id/projects', creators.getProjects);
app.post('/users', usertCrl.create);
app.put('/users', usertCrl.update);
app.delete('/users', usertCrl.delete);


global.db.once('open', function () {
    app.listen(LOCAL_APP_PORT, function () {
        console.log('App started ...');
    });
});
