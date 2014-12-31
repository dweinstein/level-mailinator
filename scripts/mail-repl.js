#!/usr/bin/env node
'use strict';

var Mail = require('../lib/mail');
var MessageRecord = require('../lib/models').MessageRecord;

var db = require('../lib/db').db;
var cfg = require('../lib/rc');

var createREPL = require('../lib/repl');
var repl = createREPL(db, cfg, {});

