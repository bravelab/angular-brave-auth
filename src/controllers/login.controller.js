(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$stateParams', '$scope', 'AuthService'];

  /**
   *
   * @param {object} $location location
   * @param {object} $scope scope
   * @param {object} authService AuthService object
   * @constructor
     */
  function LoginController($location, $stateParams, $scope, authService) {

    var vm = this;

    vm.login = login;
    vm.message = $stateParams.message; // TODO nkler: check if it works with $state.go($state.current ...)

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf app.auth.LoginController
     */
    function activate() {
    }

    /**
     * @name login
     * @desc Log the user in
     * @memberOf app.auth.LoginController
     */
    function login() {
      console.log('app.auth.LoginController');
      authService.login(vm.username, vm.password);
    }
  }

})();
