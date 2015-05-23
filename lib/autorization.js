module.exports = {

    /**
     * Verify the API KEY passed
     */
    api: function (req, res, next) {
        var apiKey = req.query.key ? req.query.key : false;

        if (!apiKey || apiKey != global.configs.app.apiKey) {
            res.send(401, JSON.stringify({
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
    token: function () {

    }
};
