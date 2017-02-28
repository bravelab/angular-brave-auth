(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.auth]
   * @description Auth module of the application.
   */
  angular.module('app.auth', ['ui.router', 'ngCookies', 'ngStorage'])
    .value('braveAuthVersion', '0.0.19');

})();


