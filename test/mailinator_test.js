var mailinator = require('../lib/mailinator');

var ReadableMessage = require('../lib/models').ReadableMessage;

var count = 0;
mailinator.getMessages("georgebush", function (err, res) {
  console.log(res);
  var message = ReadableMessage(res[1]);
  message.read(function (err, res) {
    if(err) {
      console.error(err);
    } else {
      console.log(res.data.parts[0].body);
      //console.log(res);
    }
  });
});

//var id = '1420041748-70605324-georgebush';
//mailinator.readMessage(id, function (err, res) {
//  if(err) {
//    console.error(err);
//  } else {
//    console.log(res.data.parts[0].body);
//  }
//});
