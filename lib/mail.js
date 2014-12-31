var cfg = require('./rc');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var parse = require('JSONstream').parse;
var through2 = require('through2');
var _ = require('lodash');

_.mixin({deepEqual: require('deep-equal')});

var mailinator = require('./mailinator');
var MessageRecord = require('../lib/models').MessageRecord;
var db = MessageRecord.db;

function MailWatcher() {
  EventEmitter.call(this);
  var self = this;
  MessageRecord.db.on('put', function (k, v) {
    MessageRecord.find(k, function (err, res) {
      if (!err) {
        self.emit("newMessage", res);
      }
    });
  });
}

util.inherits(MailWatcher, EventEmitter);

var Mail = (function Mail() {
  var events = new EventEmitter();

  function msgToKey(msg) {
    return msg.id;
  }

  function cacheMessage(msg) {
    var key = msgToKey(msg);
    db.get(key, function (err, value) {
      var rec = MessageRecord(msg);

      if((err && err.notFound) || !_.deepEqual(rec.toJSON(), value)) {
        rec.save(function (err) {
          if (err) { console.error(err); }
        });
      }
    });
  }

  function update() {
    mailinator.getMessages(cfg.to, function (err, res) {
      events.emit('checking');
      if (err) {
        console.error(err);
      } else {
        _.each(res, cacheMessage);
      }
    });
  }

  var checker = setInterval(function() {
    update();
  }, cfg.interval).unref();

  update();

  return {
    watch: function watch() {
      var watcher = new MailWatcher();
      return watcher;
    },
    events: events
  //  /*
  //  getAll: getAll,
  //  read: read,
  //  events: events
  //  */
  };
})();

module.exports = Mail;

