(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.auth]
   * @description braveAuthJWTHttpInterceptor directive
   */
  angular
    .module('app.auth')
    .factory('braveAuthJWTHttpInterceptor', function ($sessionStorage) {
      return {
        'request': function (config) {
          var loggedUser = angular.fromJson($sessionStorage.loggedUser);
          config.headers = config.headers || {};
          if (angular.isObject(loggedUser)) {
            config.headers.Authorization = 'JWT ' + loggedUser.token;
          }
          return config;
        }
      };
    });

})();
