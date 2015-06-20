var User = {};


/**
 * Get user infos
 * GET /me
 */
User.infos = function (req, res) {

    

    res.send(JSON.stringify({
        error: false,
        infos: {
            name: 'Romain',
            picture: '',
            rank: '1'
        }
    }));
};



module.exports = User;
