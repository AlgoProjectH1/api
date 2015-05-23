module.exports = function (req, res) {
    res.send(401, JSON.stringify({
        error: true,
        message: "Please, specify a valid URL"
    }));
};
