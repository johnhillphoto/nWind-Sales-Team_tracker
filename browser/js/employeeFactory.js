nwEmployee.factory ('Employee', function($http, $log){


function Employee(data){
    this.name = data.name;
    this.areas = data.areas || null;
    this._id = data._id || null;
    this.areaTracker = {north:false, south:false, east:false, west: false};
    this.areaCountTracker = 0;
    this.hasChanged = false;

  }

  Employee.prototype.areaCountPopulate = function(){
    if(this.areas !== null){
    this.areaCountTracker = this.areas.length;}
    else return;
  };

  Employee.prototype.areaTrackPopulate = function(){
    if(this.areaTracker !== null && this.areas !== null){
    for (var key in this.areaTracker) {
      if (this.areas.indexOf(key) !== -1){
        this.areaTracker[key] = true;
      } else {this.areaTracker[key] = false;}
    }
  }
  };

  Employee.prototype.areaCheck = function(area){
    if (this.areas.indexOf(area) !== -1){
      return true;
    }
    else { return false; }
  };

  Employee.prototype.isActive = function(){
    if (this.areas.length >= 1){
      return true;
    }
    else { return false; }
  };



return Employee;

});
