'use strict';

var nwEmployee = angular.module('nwEmployee', []);

nwEmployee.controller('mainController', function($scope, $log, nwFactory, Employee){

$scope.formInfo = {
  name: "",
  areas: []
};
$scope.employees;

$scope.clickedAreas = { north:false, south:false, east:false, west:false};
var clickedAreasArray = { north:false, south:false, east:false, west:false};
var clickedAreasReset = { north:false, south:false, east:false, west:false};

function clickedTrueCounter () {
  var num = 1;
  for (var key in clickedAreasArray) {
    if (clickedAreasArray[key] == true){
      num++;
    }//end if
  }//end for
  return num;
}// end clickedTrueCounter

$scope.clickArea = function(area){
  var count = clickedTrueCounter();
  if(clickedAreasArray[area] === false && count <= 3){
    clickedAreasArray[area] = true;
    $scope.clickedAreas = clickedAreasArray;
  } else {clickedAreasArray[area] = false;
  $scope.clickedAreas = clickedAreasArray;
}
};

function enhanceEmployee(employee){
  var enhancedEmployee = new Employee(employee);
  enhancedEmployee.areaCountPopulate();
  enhancedEmployee.areaTrackPopulate();
  return enhancedEmployee;
}

function getEmployees (Employee){
  nwFactory.getEmployees()
  .then(function(_employees){
    var employeeInstances = _employees.map(function(employee){
      return enhanceEmployee(employee);
    });
    nwFactory.team = employeeInstances;
    $scope.employees = employeeInstances;
    });
}

getEmployees();
// console.log(nwFactory.sendTeam());
//
function addEmployee (){
  nwFactory.addEmployee($scope.formInfo, clickedAreasArray)
  .then(function(employee){
    var enhancedEmployee = enhanceEmployee(employee);
    $scope.employees.unshift(enhancedEmployee);
    $scope.clickedAreas = clickedAreasReset;
    clickedAreasArray = clickedAreasReset;
    });
}//end addEmployee

$scope.addEmployee = function(){
  addEmployee();
};

function findAnEmployee(id){
  for (var i = 0; i < $scope.employees.length; i++) {
  if ($scope.employees[i]._id == id){
    return i;
  }//endif
}//end for
}

$scope.delete = function(id){
  var index = findAnEmployee(id);
  $scope.employees.splice(index, 1);
  nwFactory.delete(id);
};

$scope.changeArea = function(id, area){
  var index = findAnEmployee(id);
var flip = ($scope.employees[index].areaTracker[area]);
  if (flip === true){
    $scope.employees[index].areaTracker[area] = false;
    $scope.employees[index].areaCountTracker--;
  } else {
    if($scope.employees[index].areaCountTracker < 3){
    $scope.employees[index].areaTracker[area] = true;
    $scope.employees[index].areaCountTracker++;
  }

  }
  $scope.updateEmployee = function (id){
    updateEmployee(id);
  };

  function updateEmployee(id){
    var index = findAnEmployee(id);
    nwFactory.updateEmployee($scope.employees[index])
    .then(function(employee){
      $scope.employees[index]['areas']=employee.areas;
    });
  }//end function updateEmployee
};

});//end mainController
