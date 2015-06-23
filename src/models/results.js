module.exports = {
    connection: "",

    init: function (connection) {
        this.connection = connection;

        return this;
    },

    /**
     * Get the game history of the given user
     * @param int userID
     * @param object callbacks
     */
    get: function (userID, callbacks) {
        this.connection.query('SELECT * FROM results WHERE user_black = "'+ userID +'" OR user_white = "'+ userID +'"', function (error, rows) {
            if (error) {
                callbacks.failure(error);
                return false;
            }

            callbacks.success(rows);
        });
    }
};
