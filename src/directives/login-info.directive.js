(function() {
  'use strict';

  angular.module('app.auth')
    .directive('loginInfo', loginInfo);

  loginInfo.$inject = ['BraveAuthConfig', 'UserModel'];

  function loginInfo(authConfig, UserModel) {
    return {
      restrict: 'A',
      templateUrl: function() {
        return authConfig.getTemplates().directives.loginInfo;
      },
      link: function (scope, element) {
        scope.user = UserModel;
      }
    };
  }

}());
