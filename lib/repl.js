var REPL = require('repl');
var print = require('./print');
var xtend = require('xtend');
var _ = require('lodash');
var util = require('util');
var Tabulate = require('tabulate');
var MessageRecord = require('./models').MessageRecord;
var ReadableMessage = require('./models').ReadableMessage;

var tabulate = Tabulate(process.stdout);
var mail = require('./mail');

var replcfg = {
  prompt: '-> ',
  input: process.stdin,
  output: process.stdout,
  ignoreUndefined: true
};

var events = mail.watch();

function onNewMessage(v) {
  print(null, {newMail: v.toJSON()});
}

function onCheckNewMail() {
  util.log('checking for new email');
}

module.exports = function(db, config, cache) {

  var repl = REPL.start(replcfg);

  repl.context.watch =
  repl.context.WATCH = function(opt) {
    events.on('newMessage', onNewMessage);
    mail.events.on('checking', onCheckNewMail);
    print();
    repl.displayPrompt();
  };

  repl.context.unwatch =
  repl.context.UNWATCH = function(opt) {
    events.removeListener('newMessage', onNewMessage);
    mail.events.removeListener('checking', onCheckNewMail);
    print();
    repl.displayPrompt();
  };

  repl.context.find =
  repl.context.FIND = function(opts) {

    MessageRecord.find.apply(MessageRecord, [].concat(_.values(arguments), function (err, res) {
      if (err) {
        print(null, err);
        return;
      }
      res = _.isArray(res) ? res : [res];
      _.each(res, function (res) {
        print(null, res && res.toJSON ? res.toJSON() : res);
      });
      repl.displayPrompt();
    }));

  };

  repl.context.ls =
  repl.context.LS = function(opts) {
    var res = [];
    console.log(opts);
    MessageRecord.db.createValueStream()
    .on('data', function (v) {
      res.push(JSON.stringify(opts ? _.pick(v, opts) : v));
    })
    .on('end', function () {
      if (res.length > 0) {
        process.stdout.write(tabulate.write(res));
      }
    });
    repl.displayPrompt();
  };

  repl.context.read =
  repl.context.READ = function(opts) {
    var res = [];
    MessageRecord.find(opts, function (err, res) {
      ReadableMessage(res);
      res.read(function(err, res) {
        print(null, res);
      });
    });
    repl.displayPrompt();
  };

  return repl;
};
