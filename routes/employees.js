var router = require('express').Router();
module.exports = router;
var db = require('../server/model/db.js');
var Employee = db.Employee;

router.get('/', function(req, res, next){
  Employee.find({})
  .then (function(employees){
    res.json(employees);
  }, next);
});

router.post('/', function(req, res, next){
  Employee.create(req.body)
  .then (function(employee){
    res.json(employee);
  }, next);
});

router.put('/:id/', function(req,res, next){
  Employee.findOne({ _id: req.params.id})
  .then (function(employee){
    employee.areas = req.body.areas;
    return employee.save();
  })
  .then(function(employee){
    res.json(employee);
  }, next);
});

router.delete('/:id', function(req, res, next){
  Employee.remove({ _id: req.params.id})
  .then (function(){
    res.sendStatus(204);
  });
});
