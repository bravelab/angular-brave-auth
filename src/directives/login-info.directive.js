(function() {
  'use strict';

  angular.module('app.auth')
    .directive('loginInfo', loginInfo);

  loginInfo.$inject = ['authConfig', 'User'];

  function loginInfo(authConfig, User) {
    return {
      restrict: 'A',
      templateUrl: function() {
        return authConfig.templates.directives.loginInfo;
      },
      link: function (scope, element) {
        User.initialized.then(function () {
          scope.user = User;
        });
      }
    };
  }

}());
