nwEmployee.factory ('Team', function($http, $log, Employee){
  return {

  addToTeam: function(employee){
    $scope.employees.push(employee);
  },

  showTeam: function(){
    return $scope.employees;
  },

  hello: function(){
    return "hello from teamFactory";
  }
};

});//end factory
