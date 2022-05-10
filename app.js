var express = require('express');
var app = express();
var jackrabbit = require('jackrabbit');

var url = process.env.AMQP_URL || 'amqp://guest:guest@localhost';
var topic = process.env.TOPIC || '#';

console.log('Opening connection to RabbitMQ');

var rabbit = jackrabbit(url);
var exchange = rabbit.default();
var msgQueue ;

app.set('port', process.env.PORT || 3000);

app.get('/publish/:message', function(req, res) {
    msgQueue = exchange.queue({name: topic, durable: true});

    var message = req.params.message;
    console.log('Message sent is: ' + message);

    exchange.publish({msg:message}, {key: topic});
    res.write('Message sent is: ' + message);
    res.end();
});

app.get('/subscribe', function(req, res) {
  msgQueue = exchange.queue({name: topic, durable: true});
  msgQueue.consume(function(data, ack) {
    console.log('Message received is: ' + JSON.stringify(data.msg));
    res.json(data.msg);
  });
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
