var http = require('http');
var db = require('./model/db.js');

var server = http.createServer(require('./app.js'));


var port = process.env.port || 3000;
db.connect()
  .then(function(conn){
    console.log(conn.name);
    var port = process.env.port || 3000;
    server.listen(port, function(){
      console.log('listening on port:', port);
    });
  }, function(err){
    console.log(err);
  });
