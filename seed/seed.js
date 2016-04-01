//why not rename this file index
var db = require('.././server/model/db.js');
// console.log('db is', db);
var Promise = require('bluebird');

var Employee = db.Employee;

var data = [
    { name: 'Mike Blount',
      areas: ['north','east']
    },
    { name: 'Dick McCracken',
      areas: ['north','south']
    },
    { name: 'Shorty Tall',
      areas: ['west','east', 'north']
    },
    { name: 'Jasper Underfoot',
      areas: ['east','north']
    },
    { name: 'Lady Trampster',
      areas: ['north']
    }
];

var dataMaker = function(next){
  return db.connect()
    .then(function(test){
      // console.log(test);
      return Promise.all([Employee.remove({})]);
    })
    .then (function(){
      var Promises = data.map(function(_employee){
        return Employee.create(_employee);
      });
      return Promises;
    })
    .then (function(Promises){
      Promise.all(Promises);
    });

};

dataMaker();
