/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts')
      .controller('PieChartCtrl', PieChartCtrl);

  /** @ngInject */
  function PieChartCtrl($scope, $http, socket, dataFactory, $element, layoutPaths, baConfig) {

    socket.forward('alarmCount', $scope);

    $scope.initPieChart = initPieChartFn;
    function initPieChartFn() {
       $http.get(dataFactory.host+'/sensors/count').then(function successCallback(res) {
           pieChart.dataProvider[0].type = res.data[0]._id;
           pieChart.dataProvider[0].count = res.data[0].count;
           pieChart.dataProvider[1].type = res.data[1]._id;
           pieChart.dataProvider[1].count = res.data[1].count;
           pieChart.dataProvider[2].type = res.data[2]._id;
           pieChart.dataProvider[2].count = res.data[2].count;

           pieChart.validateData()

       }, function errorCallback(res, status, headers) {
          if(res.status == 401)
              res.redirect(401, '/login');
          else   
              alert('Internal Server Error');
       });
    };

    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    var pieChart = AmCharts.makeChart(id, {
      type: 'pie',
      startDuration: 0,
      theme: 'blur',
      addClassNames: true,
      color: layoutColors.defaultText,
      labelTickColor: layoutColors.borderDark,
      legend: {
        position: 'right',
        marginRight: 100,
        autoMargins: false,
      },
      innerRadius: '40%',
      defs: {
        filter: [
          {
            id: 'shadow',
            width: '200%',
            height: '200%',
            feOffset: {
              result: 'offOut',
              in: 'SourceAlpha',
              dx: 0,
              dy: 0
            },
            feGaussianBlur: {
              result: 'blurOut',
              in: 'offOut',
              stdDeviation: 5
            },
            feBlend: {
              in: 'SourceGraphic',
              in2: 'blurOut',
              mode: 'normal'
            }
          }
        ]
      },
      dataProvider: [
        {
          type: '0',
          count: 0
        },
        {
          type: '1',
          count: 0
        },
        {
          type: '2',
          count: 0
        }
      ],
      valueField: 'count',
      titleField: 'type',
      export: {
        enabled: true
      },
      creditsPosition: 'bottom-left',

      autoMargins: false,
      marginTop: 10,
      alpha: 0.8,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      pullOutRadius: 0,
      pathToImages: layoutPaths.images.amChart,
      responsive: {
        enabled: true,
        rules: [
          // at 900px wide, we hide legend
          {
            maxWidth: 900,
            overrides: {
              legend: {
                enabled: false
              }
            }
          },

          // at 200 px we hide value axis labels altogether
          {
            maxWidth: 200,
            overrides: {
              valueAxes: {
                labelsEnabled: false
              },
              marginTop: 30,
              marginBottom: 30,
              marginLeft: 30,
              marginRight: 30
            }
          }
        ]
      }
    });

    pieChart.addListener('init', handleInit);

    pieChart.addListener('rollOverSlice', function (e) {
      handleRollOver(e);
    });

    function handleInit() {
      pieChart.legend.addListener('rollOverItem', handleRollOver);
    }

    function handleRollOver(e) {
      var wedge = e.dataItem.wedge.node;
      wedge.parentNode.appendChild(wedge);
    }

    $scope.initPieChart();

    $scope.$on('socket:alarmCount', function (ev, data) {
      pieChart.dataProvider[0].type = data.message[0]._id;
      pieChart.dataProvider[0].count = data.message[0].count;
      pieChart.dataProvider[1].type = data.message[1]._id;
      pieChart.dataProvider[1].count = data.message[1].count;
      pieChart.dataProvider[2].type = data.message[2]._id;
      pieChart.dataProvider[2].count = data.message[2].count;

      pieChart.validateData()
    });

  }

})();
