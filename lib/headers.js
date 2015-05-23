module.exports = function () {
    return function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
        res.header("Content-type", "application/json");

        next();
    }
};
