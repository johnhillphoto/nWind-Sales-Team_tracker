'use strict';

var nwEmployee = angular.module('nwEmployee', []);

nwEmployee.controller('mainController', function($scope, $log, nwFactory){
$scope.formInfo;
$scope.employees;
$scope.getEmployees = function(employees){
  nwFactory.getEmployees()
  .then(function(_employees){
    $scope.employees = _employees;
    // console.log($scope.employees);
    // employees = _employees;

    });
};
$scope.getEmployees();

// $scope.employees = employees;


$scope.addEmployee = function(){
  nwFactory.addEmployee($scope.formInfo)
  .then(function(employee){
    });
};//end addEmployee




});//end mainController
