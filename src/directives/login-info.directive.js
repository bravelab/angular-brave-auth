(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.auth]
   * @description loginInfo directive
   */
  angular.module('app.auth').directive('loginInfo', function (User) {
    return {
      restrict: 'A',
      templateUrl: 'app.auth/directives/login-info.tpl.html',
      link: function (scope, element) {
        User.initialized.then(function () {
          scope.user = User;
        });
      }
    };
  });

})();
