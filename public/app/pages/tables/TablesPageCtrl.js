/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables')
      .controller('TablesPageCtrl', TablesPageCtrl);

  /** @ngInject */
  function TablesPageCtrl($scope, $http, dataFactory) {

    $scope.smartTablePageSize = 10;

    $scope.smartTableData =  dataFactory.getSensorList();
    $scope.smartTableData1 = $scope.smartTableData;

    $scope.$watch(function() {
        return dataFactory.sensorList;
      }, function(res) {
          $scope.smartTableData1 = dataFactory.getSensorList();
    });

  }

})();
