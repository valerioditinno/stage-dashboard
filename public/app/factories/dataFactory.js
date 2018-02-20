/**
 * Service to store data to show in views, in the current session
 *
 */
(function() {
    'use strict';

    angular.module('BlurAdmin').factory('dataFactory', dataFactory);

    function dataFactory() {

      var dataFactory = {};

      dataFactory.sensorList = [];

      dataFactory.alarmList = [];

      dataFactory.host = "http://localhost:3000";

      dataFactory.setSensorList = setSensorListFn;

      dataFactory.getSensorList = getSensorListFn;

      dataFactory.addSensorToList = addSensorToListFn;

      dataFactory.setAlarmList = setAlarmListFn;

      dataFactory.getAlarmList = getAlarmListFn;

      dataFactory.addAlarmToList = addAlarmToListFn;

      dataFactory.getHost = getHostFn;


      function getSensorListFn() {
          return dataFactory.sensorList;
      }

      function setSensorListFn(sensorList) {
          dataFactory.sensorList = sensorList;
      }

      function addSensorToListFn(sensor) {
          dataFactory.sensorList.push(sensor);
      }

      function getAlarmListFn() {
          return dataFactory.alarmList;
      }

      function setAlarmListFn(alarmList) {
          dataFactory.alarmList = alarmList;
      }

      function addAlarmToListFn(alarm) {
          dataFactory.alarmList.unshift(alarm);
      }

      function getHostFn() {
          return dataFactory.host;
      }

      return dataFactory;

    };

}());
