var Token = {};

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

    models.tokens.verify(token.token, token.user, token.device, Token.success, Token.failure);
};

Token.failure = function (error) {
    Token.res.send(401, JSON.stringify({
        error: true,
        message: error
    }));
};

Token.success = function () {
    Token.res.send(JSON.stringify({
        error: false,
    }));
};


module.exports = Token.index;
