var _ = require('lodash');
var mailinator = require('../../mailinator');
var MessageRecord = require('../models').MessageRecord;

module.exports = function ReadableMessage(message) {
  if (!(message instanceof MessageRecord)) {
    message = MessageRecord(message);
  }

  return _.merge(message, {
    read: function(opt, cb) {
      if (typeof opt === 'function') {
        cb  = opt;
        opt = {};
      }
      opt = opt || {};
      cb  = cb  || _.noop;
      mailinator.readMessage(message.id(), cb);
    }
  });
};

