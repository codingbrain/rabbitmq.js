# rabbitmq-nodejs
simple rabbitmq-nodejs to connect to amqp and to send/receive messages

## Run

```sh
npm install
npm start
```

## Use

Open browser and visit http://localhost:3000/subscribe.
The page will wait until a message is received.
Open another browser and put http://localhost:3000/publish/{"message": "hello"},
and the first browser should display the message.
