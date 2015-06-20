var fbLogin = {
    res: "",
    models: ""
};


/**
 * Lorsqu'un utilisateur souhaite se connecter via Facebook
 * POST /login/facebook
 * @param fbID
 */
fbLogin.index = function (req, res) {
    var fbID = req.body.fbID ? req.body.fbID : false;

    fbLogin.res = res;
    fbLogin.models = req.app.get('models');

    if (!fbID) {
        res.send(JSON.stringify({
            error: true,
            message: "Une erreur est survenue durant la connexion via Facebook"
        }));

        return false;
    }

    fbLogin.models.users.fbLogin({
        facebookID: fbID,
        device: 'computer'
    }, fbLogin.failure, fbLogin.success);

};


/**
 * Lorsqu'il y a une erreur
 * @param string errorMessage
 */
fbLogin.failure = function (errorMessage) {
    fbLogin.res.send(JSON.stringify({
        error: true,
        message: errorMessage
    }));
};


/**
 * Lorsque tout est ok
 * @param string token
 */
fbLogin.success = function (token) {
    var decodedToken = fbLogin.models.tokens.decode(token);
    fbLogin.models.tokens.updateLastUse(decodedToken.token, decodedToken.user);

    fbLogin.res.send(JSON.stringify({
        error: false,
        token: token
    }));
};


module.exports = fbLogin.index;
