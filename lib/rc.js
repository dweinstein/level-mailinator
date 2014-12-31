var env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";
var cfg = require('../defaults.json')[env];
var rc = require('rc');

module.exports = rc('mailinator-events', cfg);

