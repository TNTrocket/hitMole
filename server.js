var express = require('express');
var path = require('path');
var proxy = require('http-proxy-middleware');
var app = express();


app.use(express.static('./'));
app.use('/ntce-c', proxy({target: 'http://10.251.221.115:11081', changeOrigin: true}));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname,'/index.html'));
});
app.listen(3030, function() {
    console.log('正常打开8088端口')
});