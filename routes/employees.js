var router = require('express').Router();
module.exports = router;
var db = require('../server/model/db.js');
console.log('inside router');
var Employee = db.Employee;

// console.log(Employee);

// router.get('/', function(req, res, next){
//   Product.find({})
//   .then(function(products){
//     res.json(products);
//   }, next);
// });

router.get('/', function(req, res, next){
  console.log('inside route lookup');
  Employee.find({})
  .then(function(employees){
    res.json(employees);
  }, next);
});
