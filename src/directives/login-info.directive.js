(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveAuth]
   * @description loginInfo directive
   */
  angular.module('ngBraveAuth').directive('loginInfo', function (User) {
    return {
      restrict: 'A',
      templateUrl: 'ngBraveAuth/directives/login-info.tpl.html',
      link: function (scope, element) {
        User.initialized.then(function () {
          scope.user = User;
        });
      }
    };
  });

})();
