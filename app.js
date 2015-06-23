/**
 * External libraries
 */
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var sha1 = require('sha1');



/**
 * Application includes
 */
global.configs = {
    app: require('./lib/app.config.js')
};

// If we are in development environment
if (!process.env.mysql_database) {
    global.configs.database =  require('./lib/database.config.js');
} else {
    global.configs.database = {
        host    : process.env.mysql_host,
        user    : process.env.mysql_user,
        password: process.env.mysql_password,
        database: process.env.mysql_database
    };
}

var headersInit = require('./lib/headers.js');
var autorizationCheck = require('./lib/autorization.js');
var outputs = require('./lib/outputs.js');
var connection = mysql.createConnection(global.configs.database);



/**
 * Database connection
 */
connection.connect();



/**
 * Application configuration
 */
var app = express();
var routes = {
    home:       require('./src/controllers/root.js'),
    login:      require('./src/controllers/login.js'),
    signup:     require('./src/controllers/signup.js'),
    facebook:   require ('./src/controllers/facebook.login.js'),
    token:      require ('./src/controllers/token.js'),
    user:       require ('./src/controllers/user.js')
};
var models = {
    users:  require('./src/models/users.js').init(connection, sha1),
    tokens: require('./src/models/tokens.js').init(connection, sha1)
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
app.post('/signup', autorizationCheck.api, routes.signup);
app.post('/login/facebook', autorizationCheck.api, routes.facebook);
app.get('/token', autorizationCheck.api, routes.token);
app.get('/me', autorizationCheck.api, autorizationCheck.token, routes.user.infos);



/**
 * Launch application
 */
app.listen(process.env.PORT || 1337);
outputs.write("Account API server ready...");
