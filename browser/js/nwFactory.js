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
  }

};

});//end factory
