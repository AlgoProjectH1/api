module.exports = {

    /**
     * Verify the API KEY passed
     */
    api: function (req, res, next) {
        var apiKey = req.query.key ? req.query.key : false;

        if (!apiKey || apiKey != global.configs.app.apiKey) {
            res.status(401).send(JSON.stringify({
                error: true,
                message: "The API KEY is invalid"
            }));

            return false;
        }

        next();
    },

    /**
     * Verify the TOKEN passed
     */
    token: function (req, res, next) {
        var error = function () {
            res.status(401).send(JSON.stringify({
                error: true,
                message: "You have to be logged in"
            }));
        };

        var models = req.app.get('models');
        var token = req.query.token ? req.query.token : false;

        if (!token) {
            error();

            return false;
        }

        token = models.tokens.decode(token);
        models.tokens.verify(token.token, token.user, token.device, next, error);
    }
};
