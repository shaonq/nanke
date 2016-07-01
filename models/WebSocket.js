var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);
server.listen(3001);
io.on('connection', function (socket) {
    console.log('WebSocket connected');
    console.log(socket.connected);
    socket.on('message', function (d) {
        console.log(socket.id);
        socket.send(d);// socket.emit
    }).on('disconnect', function () {
        console.log('WebSocket disconnect');
    });

});
/*
 *
 *
 * 4. 其他常用API
 1).向所有客户端广播：socket.broadcast.emit('broadcast message');
 2).进入一个房间（非常好用！相当于一个命名空间，可以对一个特定的房间广播而不影响在其他房间或不在房间的客户端）：socket.join('your room name');
 3).向一个房间广播消息（发送者收不到消息）：socket.broadcast.to('your room name').emit('broadcast room message');
 4).向一个房间广播消息（包括发送者都能收到消息）（这个API属于io.sockets）：io.sockets.in('another room name').emit('broadcast room message');
 5).强制使用WebSocket通信：（客户端）socket.send('hi')，（服务器）用socket.on('message', function(data){})来接收。

 *
 *
 * */