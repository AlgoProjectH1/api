module.exports = {
    connection: "",
    sha1: "",

    init: function (connection, sha1)
    {
        this.connection = connection;
        this.sha1 = sha1;

        return this;
    },

    /**
     * Generate a token
     * @param array options
     *     user ID of the user
     *     device Device of the user
     * @return string
     */
    generate: function ()
    {
        var rand = Math.floor(Math.random() * 10 + 1);
        var dateCalc = Date.now();
        var token = this.sha1(dateCalc * rand);

        return token;
    },

    /**
     * Format a token
     * @param string token
     * @param int user
     * @param string device
     * @return string
     */
    format: function (token, user)
    {
        return token +":"+ user;
    },

    /**
     * Decode a token
     * @param string token
     * @param object
     */
    decode: function (token)
    {
        token = token.split(':');

        return {
            token:  token[0],
            user:   token[1],
            device: token[2]
        };
    },

    /**
     * Delete a token from a device
     * @param string device
     */
    deleteFromUuid: function (device)
    {
        this.connection.query("DELETE FROM tokens WHERE device = '"+ device +"'");
    },

    /**
     * Update the last use of a token
     * @param string token
     */
    updateLastUse: function (token, user)
    {
        this.connection.query("UPDATE tokens SET last_use = "+ Date.now() +" WHERE token = '"+ token +"' AND users_id = "+ user);
    },

    /**
     * Verify the token validity
     * @param string token
     * @param string user
     * @param string device
     * @param function success
     * @param function fail
     */
    verify: function (token, user, device, success, fail)
    {
        var current = this;

        current.connection.query("SELECT COUNT(token) AS count FROM tokens WHERE token = '"+ token +"' AND users_id = '"+ user +"' AND device = '"+ device +"'", function (error, rows)
        {
            if (error) {
                console.log(error);
                fail("Impossible de vérifier la validité de votre jeton de connexion");

                return false;
            }

            if (rows[0].count <= 0) {
                fail("Votre jeton de connexion est invalide");

                return false;
            }

            // Update the last use of a token
            current.updateLastUse(token, user);

            success();
        });
    }
};
