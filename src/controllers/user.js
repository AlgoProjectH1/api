var md5 = require('MD5');
var User = {};


/**
 * Get user infos
 * GET /me
 */
User.infos = function (req, res) {
    User.res = res;

    var models = req.app.get('models');
    var token = req.query.token;
    token = models.tokens.decode(token);

    models.users.getDatas(token.user, User.infosFailure, User.infosSuccess);
};


/**
 * When there is an error (get infos)
 * @param string message
 */
User.infosFailure = function (message) {
    User.res.send(JSON.stringify({
        error: true,
        message: message
    }));
};


/**
 * When everything is ok (get infos)
 * @param datas
 */
User.infosSuccess = function (datas) {
    datas.picture = md5(datas.email);

    User.res.send(JSON.stringify({
        error: false,
        infos: datas
    }));
};



module.exports = User;
