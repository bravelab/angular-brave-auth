(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthAuthorizeService', AuthAuthorizeService);

  AuthAuthorizeService.$inject = ['$rootScope', '$state', 'AuthToolsService'];

  /**
   *
   * @param $rootScope
   * @param $state
   * @param authService
   * @returns {{isIdentityResolved: isIdentityResolved, isAuthenticated: isAuthenticated, isInRole: isInRole, isInAnyRole: isInAnyRole, authenticate: authenticate, identity: identity}}
     * @constructor
     */
  function AuthAuthorizeService($rootScope, $state, authService) {

    var signin_state_name = 'login';
    var accessdenied_state_name = 'error403';

    return {
      authorize: function() {

        return authService.identity()
          .then(function() {
            var isAuthenticated = authService.isAuthenticated();

            if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !authService.isInAnyRole($rootScope.toState.data.roles)) {

              // user is signed in but not authorized for desired state
              if (isAuthenticated) {
                $state.go(accessdenied_state_name);
              } else {
                // user is not authenticated. stow the state they wanted before you
                // send them to the signin state, so you can return them when you're done
                $rootScope.returnToState = $rootScope.toState;
                $rootScope.returnToStateParams = $rootScope.toStateParams;


                $state.go(signin_state_name);
              }
            }
          });
      }
    };
  }

})();
