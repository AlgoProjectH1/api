/**
 * External libraries
 */
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');


/**
 * Application includes
 */
global.configs = {
    database: require('./lib/database.config.js'),
    app: require('./lib/app.config.js')
};
var headersInit = require('./lib/headers.js');
var autorizationCheck = require('./lib/autorization.js');
var outputs = require('./lib/outputs.js');


/**
 * Application configuration
 */
var app = express();
var routes = {
    home: require('./src/controllers/root.js')
};


/**
 * Application middleware
 */
app.use(methodOverride());
app.use(bodyParser());
app.use(headersInit());


/**
 * Application routing
 */
app.get('/', autorizationCheck.api, routes.home);


/**
 * Launch application
 */
app.listen(1337);
outputs.write("Account API server ready...");
