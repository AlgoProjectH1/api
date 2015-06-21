var md5 = require('MD5');
var User = {};


/**
 * Get user infos
 * GET /me
 */
User.infos = function (req, res) {
    var models = req.app.get('models');
    var token = req.query.token;
    token = models.tokens.decode(token);

    models.users.getDatas(token.user,
        function (error) { User.infosFailure(res, error); },
        function (datas) { User.infosSuccess(res, datas); }
    );
};


/**
 * When there is an error (get infos)
 * @param string message
 */
User.infosFailure = function (res, message) {
    res.send(JSON.stringify({
        error: true,
        message: message
    }));
};


/**
 * When everything is ok (get infos)
 * @param datas
 */
User.infosSuccess = function (res, datas) {
    datas.picture = md5(datas.email);

    res.send(JSON.stringify({
        error: false,
        infos: datas
    }));
};



module.exports = User;
