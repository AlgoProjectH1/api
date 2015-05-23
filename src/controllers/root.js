module.exports = function (req, res) {
    res.send(404, JSON.stringify({
        error: true,
        message: "Please, specify a valid URL"
    }));
};
