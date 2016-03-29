nwEmployee.factory ('nwFactory', function($http, $log, Employee){
  return {

  getEmployees: function(){
    return $http.get('/employees')
      .then(function(response){
        return response.data;
      })
      .catch($log.error);
  },

  addEmployee: function(formInfo, clickedAreasArray){
    for (var key in clickedAreasArray) {
      if (clickedAreasArray[key]){
        formInfo.areas.push(key);
      }
    }//end for
    var newEmployee = new Employee(formInfo);
    return $http.post('/employees', newEmployee)
      .then(function(employee){
        return employee.data;
      })
      .catch($log.error);
  },

  delete: function(id){
    $http.delete('/employees/' + id);
  },
  updateEmployee: function(employee){
    var tempEmployee = {
      _id: employee._id,
      areas: []
    };
    for (var key in employee.areaTracker) {
      if (employee.areaTracker[key] === true) {
        tempEmployee.areas.push(key);
      }
    }
    return $http.put('/employees/' + employee.id, tempEmployee)
      .then(function(employee){
        return employee.data;
      })
      .catch($log.error);

  }//end function

};

});//end factory
