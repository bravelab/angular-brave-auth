(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthAuthorizeService', AuthAuthorizeService);

  AuthAuthorizeService.$inject = ['$rootScope', '$state', 'AuthToolsService'];

  /**
   *
   * @param {Object} $rootScope - Root Scope
   * @param {Object} $state - State
   * @param {Object} authService - Auth Service
   * @returns {{isIdentityResolved: isIdentityResolved, isAuthenticated: isAuthenticated, isInRole: isInRole, isInAnyRole: isInAnyRole, authenticate: authenticate, identity: identity}}
     * @constructor
     */
  function AuthAuthorizeService($rootScope, $state, authService) {

    var signinStateName = 'login';
    var accessdeniedStateName = 'error403';

    return {
      authorize: function() {

        return authService.identity()
          .then(function() {
            var isAuthenticated = authService.isAuthenticated();

            if ($rootScope.toState.data.roles &&
              $rootScope.toState.data.roles.length > 0 &&
              !authService.isInAnyRole($rootScope.toState.data.roles)) {

              // user is signed in but not authorized for desired state
              if (isAuthenticated) {
                $state.go(accessdeniedStateName);
              } else {
                // user is not authenticated. stow the state they wanted before you
                // send them to the signin state, so you can return them when you're done
                $rootScope.returnToState = $rootScope.toState;
                $rootScope.returnToStateParams = $rootScope.toStateParams;

                $state.go(signinStateName);
              }
            }
          });
      }
    };
  }

})();
