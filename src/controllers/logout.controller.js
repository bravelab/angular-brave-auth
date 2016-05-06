(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveAuth]
   * @ Logout controller
   */
  angular
    .module('ngBraveAuth')
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

