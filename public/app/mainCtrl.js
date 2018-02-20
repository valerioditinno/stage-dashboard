/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin')
      .controller('mainCtrl', mainCtrl);

  /** @ngInject */
  function mainCtrl($scope, $http, dataFactory, socket, $localStorage) {

    socket.forward('alarm', $scope);
    socket.forward('sensor', $scope);

    $scope.$on('socket:alarm', function (ev, data) {
        var new_alarm = data.message;
        dataFactory.addAlarmToList(new_alarm);    
        
    });

    $scope.$on('socket:sensor', function (ev, data) {
        var new_sensor = data.message;
        dataFactory.addSensorToList(new_sensor);  
        
    });

    //TODO handle net::ERR_CONNECTION_REFUSED


    $scope.initTable = initTableFn;
    function initTableFn() {
       $http.get(dataFactory.host+'/sensors/sensors_list').then(function successCallback(res) {  
           var tmp = composeSensorList(res.data);
           dataFactory.setSensorList(tmp);
       }, function errorCallback(res, status, headers) {
            if(res.status == 401)
               res.redirect(401, '/login');
            else   
                alert('Internal Server Error');
       });
    };
    $scope.initTable();

    $scope.initAlarm = initAlarmFn;
    function initAlarmFn() {
       $http.get(dataFactory.host+'/sensors/alarms_list').then(function successCallback(res) {
           var tmp = composeAlarmList(res.data);
           dataFactory.setAlarmList(tmp);
       }, function errorCallback(res, status, headers) {
            if(res.status == 401)
               res.redirect(401, '/login');
            else   
               alert('Internal Server Error');
       });
    };
    $scope.initAlarm();

    function composeSensorList(data) {
      var list = [];
      var tmp = data;
      for (var i = 0 ; i < tmp.length ; i++){
          list.push(tmp[i]);
      }
      return list;
    }

    function composeAlarmList(data) {
        var list = [];
        var tmp = data;
        for (var i = 0 ; i < tmp.length ; i++){
            list.unshift(tmp[i]);
        }
        return list;
      }

    
    function logoutFn() {
        delete $localStorage.token;
    }
    $scope.logout = logoutFn;

  }
})();
