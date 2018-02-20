/**
 * Service to get a socket linked with server
 */

(function() {
    'use strict';

    angular.module('BlurAdmin').factory('socket', socket);

    function socket(socketFactory) {  //TODO fix the problem : socket dont forward event until page reload
        var mySocket = socketFactory();
        return mySocket;
    }

}());
