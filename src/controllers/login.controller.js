(function () {
  'use strict';

  angular
    .module('ngBraveAuth')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$scope', 'AuthService'];

  /**
   *
   * @param {object} $location location
   * @param {object} $scope scope
   * @param {object} authService AuthService object
   * @constructor
     */
  function LoginController($location, $scope, authService) {
    var vm = this;

    vm.login = login;

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf ngBraveAuth.LoginController
     */
    function activate() {
      // If the user is authenticated, they should not be here.
      // if (authService.isAuthenticated()) {
      //    $location.url('/');
      // }
    }

    /**
     * @name login
     * @desc Log the user in
     * @memberOf ngBraveAuth.LoginController
     */
    function login() {
      authService.login(vm.username, vm.password);
    }

    /**
     $scope.$on('event:google-plus-signin-success', function (event, authResult) {
      if (authResult.status.method == 'PROMPT') {
        GooglePlus.getUser().then(function (user) {
          User.username = user.name;
          User.picture = user.picture;
          $state.go('app.dashboard');
        });
      }
    });

    $scope.$on('event:facebook-signin-success', function (event, authResult) {
      ezfb.api('/me', function (res) {
        User.username = res.name;
        User.picture = 'https://graph.facebook.com/' + res.id + '/picture';
        $state.go('app.dashboard');
      });
    });*/
  }
})();
