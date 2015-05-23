var assert = require('assert');
var tokens = require('../src/models/tokens.js');

describe('Tokens', function() {
    describe('#format()', function() {
        it('should return {token}:{user} string', function() {
            var token = {token: "1234abcd", user: 1};
            assert.equal("1234abcd:1", tokens.format(token.token, token.user));
        })
    })

    describe('#decode()', function() {
        it('should return {token, user, device} object', function () {
            var token = "1234abcd:1:computer";
            assert.equal(JSON.stringify({token:"1234abcd",user:"1",device:"computer"}), JSON.stringify(tokens.decode(token)));
        })
    })
})
