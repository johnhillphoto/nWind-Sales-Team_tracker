var Promise = require('bluebird');
var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
  name: String,
  areas: [String]
});

var Employee = mongoose.model('employee', employeeSchema);

//set up connection to db

var _conn;

function connect(){
  if(_conn)
    return _conn;
  _conn = new Promise(function(resolve, reject){
    mongoose.connect(process.env.CONN, function(err){
      if(err)
        return reject('make sure mongo is running on this machine');
      resolve(mongoose.connection);
    });
  });
  return _conn;
}

function disconnect(){
  return new Promise(function(resolve, reject){
    mongoose.disconnect(function(){
      _conn = null;
      resolve();
    });
  });
}

module.exports = {
  connect: connect,
  disconnect: disconnect,
  Employee: Employee
};
