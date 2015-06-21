var Login = {
    res: "",
    models: ""
};


/**
 * When a user wants to connect
 * POST /login
 * @param email
 * @param password
 */
Login.index = function (req, res) {
    var pseudo = req.body.email ? req.body.email : false;
    var password = req.body.password ? req.body.password : false;

    Login.models = req.app.get('models');

    if (!pseudo) {
        res.send(JSON.stringify({
            error: true,
            message: "Merci d'indiquer un email"
        }));

        return false;
    }

    if (!password) {
        res.send(JSON.stringify({
            error: true,
            message: "Merci d'indiquer un mot de passe"
        }));

        return false;
    }

    Login.models.users.login({
        email: pseudo,
        password: password,
        device: 'computer'
    },
        function (error) { Login.failure(res, error); },
        function (token) { Login.success(res, token); }
    );

};


/**
 * When there is an error
 * @param string errorMessage
 */
Login.failure = function (res, errorMessage) {
    res.send(JSON.stringify({
        error: true,
        message: errorMessage
    }));
};


/**
 * When everything is ok
 * @param string token
 */
Login.success = function (res, token) {
    var decodedToken = Login.models.tokens.decode(token);
    Login.models.tokens.updateLastUse(decodedToken.token, decodedToken.user);

    res.send(JSON.stringify({
        error: false,
        token: token
    }));
};


module.exports = Login.index;
