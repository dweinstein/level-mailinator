var level = require('level');
var cfg = require('./rc');
var join = require('path').join;
var resolve = require('path').resolve;

var db_path = resolve(join(__dirname, '..'), cfg.db || 'mail.db');
var db = level(db_path);

module.exports = {
  db: db
};

