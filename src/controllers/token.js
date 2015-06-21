var Token = {};

/**
 * When a user wants to verify his token
 * GET /token
 * @param token
 */
Token.index = function (req, res) {
    var token = req.query.token ? req.query.token : false;

    Token.res = res;

    if (!token) {
        res.send(JSON.stringify(401, {
            error: true,
            message: "Jeton de connexion invalide"
        }));

        return false;
    }

    var models = req.app.get('models');
    token = models.tokens.decode(token);

    models.tokens.verify(token.token, token.user, token.device,
        function () { Token.success(res); },
        function (error) { Token.failure(res, error); }
    );
};


/**
 * When there is an error
 * @param string error
 */
Token.failure = function (res, error) {
    res.send(401, JSON.stringify({
        error: true,
        message: error
    }));
};


/**
 * When everything is ok
 */
Token.success = function (res) {
    res.send(JSON.stringify({
        error: false,
    }));
};


module.exports = Token.index;
