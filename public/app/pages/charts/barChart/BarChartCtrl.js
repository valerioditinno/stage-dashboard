/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts')
      .controller('BarChartCtrl', BarChartCtrl);

  /** @ngInject */
  function BarChartCtrl($scope, $http, socket, dataFactory, baConfig, $element, layoutPaths) {

    socket.forward('alarmCount', $scope);

    $scope.initBarChart = initBarChartFn;
    function initBarChartFn() {
       $http.get(dataFactory.host+'/sensors/count').then(function successCallback(res) {
           barChart.dataProvider[0].type = res.data[0]._id;
           barChart.dataProvider[0].count = res.data[0].count;
           barChart.dataProvider[1].type = res.data[1]._id;
           barChart.dataProvider[1].count = res.data[1].count;
           barChart.dataProvider[2].type = res.data[2]._id;
           barChart.dataProvider[2].count = res.data[2].count;

           barChart.validateData()

       }, function errorCallback(res, status, headers) {
            if(res.status == 401)
                res.redirect(401, '/login');
            else   
                alert('Internal Server Error');
       });
    };

    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    var barChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      color: layoutColors.defaultText,
      dataProvider: [
        {
          color: layoutColors.primary
        },
        {
          color: layoutColors.danger
        },
        {
          color: '#dfb81c'
        }
      ],
      valueAxes: [
        {
          axisAlpha: 0,
          position: 'left',
          title: 'Numbers of detected alarms',
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
        }
      ],
      startDuration: 1,
      graphs: [
        {
          balloonText: '<b>[[category]]: [[value]]</b>',
          fillColorsField: 'color',
          fillAlphas: 0.7,
          lineAlpha: 0.2,
          type: 'column',
          valueField: 'count'
        }
      ],
      chartCursor: {
        categoryBalloonEnabled: false,
        cursorAlpha: 0,
        zoomable: false
      },
      categoryField: 'type',
      categoryAxis: {
        gridPosition: 'start',
        labelRotation: 45,
        gridAlpha: 0.5,
        gridColor: layoutColors.border,
      },
      export: {
        enabled: true
      },
      creditsPosition: 'top-right',
      pathToImages: layoutPaths.images.amChart
    });

    $scope.initBarChart();

    $scope.$on('socket:alarmCount', function (ev, data) {
      barChart.dataProvider[0].type = data.message[0]._id;
      barChart.dataProvider[0].count = data.message[0].count;
      barChart.dataProvider[1].type = data.message[1]._id;
      barChart.dataProvider[1].count = data.message[1].count;
      barChart.dataProvider[2].type = data.message[2]._id;
      barChart.dataProvider[2].count = data.message[2].count;

      barChart.validateData()
    });
  }
})();
