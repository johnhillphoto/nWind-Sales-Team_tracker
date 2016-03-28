nwEmployee.factory ('nwFactory', function($http, $log){
  var tools = {};
  var data ={
    employees: null
  };
  tools.getEmployees = function(){
    // var employees;
    return $http.get('/employees')
      .then(function(response){
        data.employees = response.data;
        return data.employees;
      })
      .catch($log.error);
  };

  tools.sendData = function(){
    this.getEmployees();
    return data;
  };

  tools.addEmployee = function(newEmployee){
    return $http.post('/employees', newEmployee)
      .then(function(response){
        return response.data;
      })
      .catch($log.error);
  };

  tools.areaChecker = function(employees){
    console.log(employees);
    var areaBlock = {
      north: false,
      south: false,
      east: false,
      west: false
    };
    // var found;
    // for (var i = 0; i < employees.length; i++) {
    //   if (employees[i][_id] === _idIn){
    //     found = employees[i];
    //   }
    // }//end for
    // for (var key in areaBlock){
    //   if(found.indexOf(key)){
    //     areaBlock[key] = true;
    //   }
    // }
  console.log(areaBlock);
};// end areaChecker


  return tools;

});//end factory
