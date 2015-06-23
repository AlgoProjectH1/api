var signUp = {
    models: {}
};


/**
 * When a user wants to connect
 * POST /login
 * @param email
 * @param password
 */
signUp.index = function (req, res) {
    var email = req.body.email ? req.body.email : false;
    var password = req.body.password ? req.body.password : false;
    var pseudo = req.body.pseudo ? req.body.pseudo : false;

    signUp.models = req.app.get('models');

    if (!email) {
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

    if (!pseudo) {
        res.send(JSON.stringify({
            error: true,
            message: "Merci d'indiquer un pseudo"
        }));

        return false;
    }

    signUp.models.users.signup({
        email: email,
        pseudo: pseudo,
        password: password,
        device: 'computer'
    },
        function (error) { signUp.failure(res, error); },
        function (token) { signUp.success(res, token); }
    );

};


/**
 * When there is an error
 * @param string errorMessage
 */
signUp.failure = function (res, errorMessage) {
    res.send(JSON.stringify({
        error: true,
        message: errorMessage
    }));
};


/**
 * When everything is ok
 * @param string token
 */
signUp.success = function (res, token) {
    var decodedToken = signUp.models.tokens.decode(token);
    signUp.models.tokens.updateLastUse(decodedToken.token, decodedToken.user);

    res.send(JSON.stringify({
        error: false,
        token: token
    }));
};



module.exports = signUp.index;
