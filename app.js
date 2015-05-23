/**
 * External libraries
 */
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mysql = require('mysql');



/**
 * Application includes
 */
global.configs = {
    database:   require('./lib/database.config.js'),
    app:        require('./lib/app.config.js')
};
var headersInit = require('./lib/headers.js');
var autorizationCheck = require('./lib/autorization.js');
var outputs = require('./lib/outputs.js');
var connection = mysql.createConnection(configs.database);



/**
 * Database connection
 */
connection.connect();



/**
 * Application configuration
 */
var app = express();
var routes = {
    home:   require('./src/controllers/root.js'),
    login:  require('./src/controllers/login.js')
};
var models = {
    users:  require('./src/models/users.js'),
    tokens: require('./src/models/tokens.js')
};
models.users.setTokenManager(models.tokens);
app.set('models', models);



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
app.post('/login', autorizationCheck.api, routes.login);



/**
 * Launch application
 */
app.listen(1337);
outputs.write("Account API server ready...");
