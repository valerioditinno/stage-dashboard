/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('alarm', alarm);

  /** @ngInject */
  function alarm() {
    return {
      restrict: 'E',
      controller: 'alarmCtrl',
      templateUrl: 'app/pages/dashboard/alarm/alarm.html'
    };
  }
})();
