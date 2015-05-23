/**
 * External libraries
 */
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');


/**
 * Application includes
 */
var headersInit = require('./lib/headers.js');
var autorizationCheck = require('./lib/autorization.js');
var outputs = require('./lib/outputs.js');


/**
 * Application configuration
 */
var app = express();


/**
 * Application middleware
 */
app.use(methodOverride());
app.use(bodyParser());
app.use(headersInit());


/**
 * Application routing
 */
app.get('/', function (req, res) {
    
});


/**
 * Launch application
 */
app.listen(1337);
outputs.success("Account API server ready...");
