Get a token from [mailinator](https://www.mailinator.com/apidocs.jsp)

```
$ cp defaults.json.example defaults.json
$ vim defaults.json # set token value
...
$ ./scripts/mail-repl
-> watch()
'OK'
-> ls
[Function]
-> ls()
undefined
->
{"id":"1419530507-35948612-georgebush","to":"georgebush@mailinator.com","time":1419530507513,"subject":"Say Hello to these matches!","fromfull":"donotreply@cougarlife.com","been_read":false,"from":"Cougar Life","ip":"66.240.151.87"}
{"id":"1419564838-37346551-georgebush","to":"georgebush@mailinator.com","time":1419564838050,"subject":"guarantee you will get laid tonight ","fromfull":"AdDe@36onthequay.co.uk","been_read":false,"from":"Landon","ip":"118.97.175.114"}
...
>
31 Dec 13:31:13 - checking for new email
{ newMail:
   { id: '1420050661-71115404-georgebush',
     to: 'georgebush@mailinator.com',
     time: 1420050661588,
     subject: 'testing...',
     fromfull: 'xxxxxxxxx@gmail.com',
     been_read: false,
     from: 'David',
     ip: '209.85.214.177' } }
-> read('1420050661-71115404-georgebush')
 { apiInboxFetchesLeft: 202,
  apiEmailFetchesLeft: 10,
  data:
   { headers:
      { sender: 'xxxxxxxx@gmail.com',
        'content-type': 'multipart/alternative; boundary=001a113dd2763a4e3f050b874f32',
        to: 'georgebush@mailinator.com',
        'x-connecting-ip': '209.85.214.177',
        subject: 'testing...',
        'mime-version': '1.0',
        'x-received-time': '1420050661588',
        received: 'by 10.202.74.142 with HTTP; Wed, 31 Dec 2014 10:31:01 -0800 (PST)',
        from: 'David <xxxxxxxx@gmail.com>',
        date: 'Wed, 31 Dec 2014 13:31:01 -0500',
        'x-received': 'by 10.202.192.11 with SMTP id q11mr31695062oif.75.1420050661263;\r\n Wed, 31 Dec 2014 10:31:01 -0800 (PST)' },
     seconds_ago: 27,
     id: '1420050661-71115404-georgebush',
     to: 'georgebush@mailinator.com',
     time: 1420050661588,
     subject: 'testing...',
     fromfull: 'xxxxxxxx@gmail.com',
     parts: [ [Object], [Object] ],
     been_read: false,
     from: 'David',
     ip: '209.85.214.177' },
  forwardsLeft: 10 }
->
(^C again to quit)
->
```
