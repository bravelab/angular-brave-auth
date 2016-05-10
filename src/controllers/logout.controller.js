(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.auth]
   * @ Logout controller
   */
  angular
    .module('app.auth')
    .controller('LogoutController', LogoutController);

  LogoutController.$inject = ['AuthService'];

  /**
   *
   * @param {object} authService AuthService object
   * @description Auth service
   * @constructor
   */
  function LogoutController(authService) {
    authService.logout();
  }

})();

