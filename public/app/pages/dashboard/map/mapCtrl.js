/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('mapCtrl', mapCtrl);

  /** @ngInject */
  function mapCtrl($timeout, $http, dataFactory) {

    var locations = dataFactory.getSensorList;

    function initialize() {

      var map = new google.maps.Map(document.getElementById('google-maps'), {
        zoom: 20,
        center: {lat: 41.936383, lng: 12.633537},
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var imgBounds = {
        north: 41.936602,
        south: 41.936233,
        east: 12.633781,
        west: 12.633288
      };

      var imgOverlay = new google.maps.GroundOverlay(
          'assets/img/intecs.png',
          imgBounds);
      imgOverlay.setMap(map);

      var infowindow = new google.maps.InfoWindow();

      var marker, i;

      var icon = {
          url: 'assets/img/mic_green.svg', // url
          scaledSize: new google.maps.Size(25, 25),
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
      };

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i].latitude, locations[i].longitude),
          icon: icon,
          map: map
        });

        marker.set("id", locations[i].id);

        google.maps.event.addListener(marker, 'click', (function(marker,  i) {
          return function() {
            var lat = parseFloat(locations[i].latitude).toFixed(6);
            var lon = parseFloat(locations[i].longitude).toFixed(6);
            infowindow.setContent('<div>'+
                                      '<b>Id: </b>'+locations[i].id+'<br/>'+
                                      '<b>Latitude: </b>'+lat+'<br/>'+
                                      '<b>Longitude: </b>'+lon+'<br/>'+
                                  '</div>');
            infowindow.open(map, marker);
          }
        })(marker, i));

        $timeout(function() {
          var icon = {
            url: 'assets/img/mic_red.png', // url
            scaledSize: new google.maps.Size(25, 25),
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
          };
          marker.setIcon(icon);

          /*var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.1,
            map: map,
            center: {lat: 41.93635723685401, lng:12.633730173110962},
            radius: 3
          });*/
        }, 1000 ); // every 1 second
      }
    }

    $timeout(function(){
      initialize();
    }, 500);

    function composeList(data) {
      var list = [];
      var tmp = (JSON.parse(JSON.stringify(data)));
      for (var i = 0 ; i < tmp.length ; i++){
          list.push(tmp[i]);
      }
      return list;
    }

    $timeout(function(){
      updateMarker();
    }, 100);

    // every 10 seconds
    //setInterval(updateMarker,10000);

    function updateMarker() {
      $http.get(dataFactory.host+'/sensors/sensors_list').then(function successCallback(res) {
          locations = composeList(res.data);
      }, function errorCallback(res, status, headers) {
          if(res.status == 401)
              res.redirect(401, '/login');
          else   
              alert('Internal Server Error');
      });
    }
  }

})();
