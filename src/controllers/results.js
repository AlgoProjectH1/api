var results = {};


/**
 * Get the user results history
 * @param string token
 */
results.history = function (req, res) {
    var models = req.app.get('models');
    var token = (req.query.token) ? req.query.token : false;
    token = models.tokens.decode(token);

    models.results.get(token.user, {
        failure: function (message) { results.onHistoryFailure(res, message); },
        success: function (games) { results.onHistorySuccess(res, games); }
    });
};


/**
 * When we succeed to get the games
 * @param object res
 * @param object games
 */
results.onHistorySuccess = function (res, games) {
    res.send(JSON.stringify({
        error: false,
        games: games
    }));
};


/**
 * When we succeed to get the games
 * @param object res
 * @param object games
 */
results.onHistoryFailure = function (res, message) {
    res.send(JSON.stringify({
        error: true,
        message: message
    }));
};


module.exports = results;
