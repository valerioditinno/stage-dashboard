/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('alarmCtrl', alarmCtrl);


  /** @ngInject */
  function alarmCtrl($scope, dataFactory) {

    $scope.alarm =  dataFactory.getAlarmList();

    function deleteAlarmFn(index) {     // TODO is safe???
        var tmp = dataFactory.getAlarmList();
        tmp.splice(index,1);
        dataFactory.setAlarmList(tmp);
    }
    $scope.deleteAlarm = deleteAlarmFn;

    $scope.$watch(function() {
        return dataFactory.alarmList;
      }, function(res) {
          $scope.alarmList = dataFactory.getAlarmList();
    });

    function textLabelFn(type) {
        if (type == 0) { 
            return "GLASSBREAKING"; 
        } else if (type == 1) { 
            return "GUNSHOT"; 
        } else if (type == 2) { 
            return "SCREAM"; 
        }
      }
      $scope.textLabel =  textLabelFn;
  }
})();
