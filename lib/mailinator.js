var q = require('hyperquest');
var split = require('split');
var parse = require('JSONstream').parse;
var util = require('util');
var qs = require('querystring');
var through2 = require('through2');

var cfg = require('./rc');

var Mailinator = (function Mailinator() {
  var self = this;
  var base = "https://api.mailinator.com/api/";

  function _request(opt, callback) {
    opt = opt || {};

    var all = [];
    q(opt.url)
    .pipe(split())
    .pipe(parse(opt.parse))
    .pipe(through2.obj(function (chunk, enc, callback) {
      this.push(chunk);
      callback();
    }))
    .on('data', function(data) {
      all.push(data);
    })
    .on('end', function() {
      callback(null, all);
    });
  }

  function readMessage(msgid, callback) {
    var url = base + '/email?' + qs.stringify({token:cfg.token, msgid: msgid});
    _request({url: url}, function (err, res) {
      callback(err, err ? null : res[0]);
    });
  }

  function getMessages(to, callback) {
    var url = base + '/inbox?' + qs.stringify({token:cfg.token, to: to || cfg.to});
    _request({url: url, parse: 'messages.*'}, callback);
  }

  return {
    getMessages: getMessages,
    readMessage: readMessage
  };
})();

module.exports = Mailinator;
