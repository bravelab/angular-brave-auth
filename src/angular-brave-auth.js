(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveAuth]
   * @description Auth module of the application.
   */
  angular.module('ngBraveAuth', ['ui.router', 'ngCookies'])
    .value('version', '0.0.4')
    .constant('authKeys', {
      googleClientId: '',
      facebookAppId: ''
    })
    .constant('APP_CONFIG', {
      apiUrl: '/api'
    });

})();
