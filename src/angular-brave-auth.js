(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.auth]
   * @description Auth module of the application.
   */
  angular.module('app.auth', ['ui.router', 'ngCookies', 'ngStorage'])
    .value('version', '0.0.11')
    .config(function ($httpProvider) {

      $httpProvider.interceptors.push(['$sessionStorage', function ($sessionStorage) {
        return {
          'request': function (config) {
            // TODO: Configurable headers
            var loggedUser = angular.fromJson($sessionStorage.loggedUser);
            config.headers = config.headers || {};
            if (angular.isDefined(loggedUser.token) && loggedUser.token) {
              config.headers.Authorization = 'JWT ' + loggedUser.token;
            }
            return config;
          }
        };
      }]);

    });

})();


