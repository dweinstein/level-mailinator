var model = require('modella');
var validators = require('modella-validators');

var db = require('../db').db;
var level = require('modella-leveldb')(db);

var MessageRecord = model('MessageRecord')
  .attr('id')
  .attr('to', { required: true, type: 'string', format: 'email' })
  .attr('time', { required: true, type: 'number' })
  .attr('subject', { required: true, type: 'string' })
  .attr('fromfull', { required: true, format: 'email'})
  .attr('been_read', { type: 'boolean', required: true})
  .attr('from', { required: true, type: 'string' })
  .attr('ip', { required: true, type: 'string', format: 'ip' });

MessageRecord.use(validators);
MessageRecord.use(level);

MessageRecord
  .index('email')
  .index('from')
  .index('fromfull')
  .index('ip');

module.exports.MessageRecord = MessageRecord;

