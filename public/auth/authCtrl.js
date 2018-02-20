(function () {
    'use strict';
    angular.module('authApp', ['ngStorage'])
        .controller('authCtrl', function authCtrl($scope, $http, $localStorage) {
            $scope.errorMessage = false;
            
            function submitFn(user) {
                var host = 'http://localhost:3000';

                $http.post(host+'/login/auth',user).success(function(response) {
                    if(response.success == true){
                        $localStorage.token = response.token;
                        window.location = "/";
                    }
                    else 
                        $scope.errorMessage = 'Wrong email or password';
                }) 
                .error(function() { 
                    alert('Internal Server Error');
                }); 
            }
            $scope.submit = submitFn;
    
        });

})();