module.exports = {
    connection: "",
    sha1: "",
    tokenManager: "",

    /**
     * Init the model
     * @param object connection
     * @param object sha1
     */
    init: function (connection, sha1)
    {
        this.connection = connection;
        this.sha1 = sha1;

        return this;
    },

    /**
     * Set the token manager
     * @param object tokenManager
     */
    setTokenManager: function (tokenManager)
    {
        this.tokenManager = tokenManager;
    },
};
