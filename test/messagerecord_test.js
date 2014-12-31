var MessageRecord = require('../lib/models').MessageRecord;

var message = MessageRecord({
  "seconds_ago": 2321,
  "id": "1419568848-37536714-georgebush",
  "to": "georgebush@mailinator.com",
  "time": 1419568848674,
  "subject": "Realize all of her dreams with our help for short time",
  "fromfull": "wpark@cs.uwm.edu",
  "been_read": false,
  "from": "Roosevelt Shaver",
  "ip": "81.22.138.173"
});

message.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('saved...');
  }
});

