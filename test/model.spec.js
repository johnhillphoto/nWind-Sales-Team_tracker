var expect = require('chai').expect;
var db = require('.././server/model/db.js');
var Promise = require('bluebird');
var Employee = db.Employee;

function Employee_ (data){
    this.name = data.name;
    this.areas = data.areas;
    this._id = data._id || null;
  }
  Employee.prototype.areaCount = function(){
    return this.areas.length;
  };

  Employee.prototype.areaCheck = function(area){
    if (this.areas.indexOf(area) !== -1){
      return true;
    }
    else { return false; }
  };

  Employee.prototype.isActive = function(){
    if (this.areas.length > 1){
      return true;
    }
    else { return false; }
  };

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
    .then(function(){
      return Promise.all([Employee.remove({})]);
    })
    .then (function(){
      var Promises = data.map(function(_employee){
        var newEmployee = new Employee_(_employee);
        return Employee.create(newEmployee);
      });
      return Promises;
    })
    .then (function(Promises){
      Promise.all(Promises);
    });
};//end dataMaker
//
describe('model testing', function(){
  beforeEach(function(done){
        dataMaker()
      .then(function(){
        done();
      });
  });//end beforeEach

  describe('get all employees', function(){
  var employees;
  beforeEach(function(done){
    Employee.find({})
      .then(function(_employees){
        employees = _employees;
        console.log(employees);
        done();
      }, done);
  });

  it('Number of found employees is correct at 5', function(){
    expect(employees.length).to.equal(5);
  });

  it('First employee name is Mike Blount', function(){
    expect(employees[0].name).to.equal("Mike Blount");
  });
  //
  it('First employee name is Lady Trampster', function(){
    expect(employees[4].name).to.equal("Lady Trampster");
  });
});

  describe('get an employee', function(){
  var employee;
  beforeEach(function(done){
    Employee.findOne({ name: 'Mike Blount'})
      .then(function(_employee){
        employee = _employee;
        done();
      }, done);
  });//end beforeEach

  it('Object is returned from findOne', function(){
    expect(typeof employee).to.equal('object');
  });

  it('Employee name is Mike Blount', function(){
    expect(employee.name).to.equal('Mike Blount');
  });

  it('Employee areas are north and east', function(){
      expect(employee.areas[0]).to.equal('north');
      expect(employee.areas[1]).to.equal('east');
    });

  });//end describe block

describe('add an employee', function(){
  var employee;
  beforeEach(function(done){
    Employee.create({ name: 'Bella Kat',
      areas: ['north','west']
    })
      .then(function(){
        return Employee.findOne({ name: 'Bella Kat'});
      })
      .then(function(_employee){
        employee = _employee;
        done();
      }, done);
  });//end beforeEach

  it('Employee name is Bella Kat', function(){
    expect(employee.name).to.equal('Bella Kat');
  });

  it('Employee areas are north and west', function(){
      expect(employee.areas[0]).to.equal('north');
      expect(employee.areas[1]).to.equal('west');
    });
  });//end describe block

  describe('change an employee', function(){
    var employee;
    beforeEach(function(done){
      Employee.findOne({ name: 'Jasper Underfoot'})
        .then(function(_employee){
          _employee.areas = ['south', 'east'];
          return _employee.save();
        })
        .then(function(_employee){
          return Employee.findOne({ name: 'Jasper Underfoot'});
        })
        .then(function(_employee){
          employee = _employee;
          done();
        }, done);
    });//end beforeEach

    it('Employee areas are south and east', function(){
        expect(employee.areas[0]).to.equal('south');
        expect(employee.areas[1]).to.equal('east');
      });
    });//end describe block

  });//end of all testing
