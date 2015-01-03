var cfg = require('./rc');

module.exports = require('mailinator')({token: cfg.token});
