/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('map', map);

  /** @ngInject */
  function map() {
    return {
      restrict: 'E',
      controller: 'mapCtrl',
      templateUrl: 'app/pages/dashboard/map/map.html'
    };
  }
})();
