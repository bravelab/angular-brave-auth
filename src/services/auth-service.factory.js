(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$cookies', '$state', '$rootScope', '$localStorage', '$q', '$http', 'BraveAuthConfig', 'AuthToolsService', 'UserModel'];

  /**
   *
   * @param {Object} $cookies
   * @param {Object} $state
   * @param {Object} $localStorage
   * @param {Object} $q
   * @param {Object} $http
   * @param {Object} braveAuthConfig
   * @param {Object} authToolsService
   * @returns {{login: app.auth.services.AuthService.login, logout: app.auth.services.AuthService.logout}}
     * @constructor
     */
  function AuthService($cookies, $state, $rootScope, $localStorage, $q, $http, braveAuthConfig, authToolsService, UserModel) {

    /**
     * @name AuthService
     * @desc The Factory to be returned
     */
    var factory = {
      login: login,
      logout: logout
    };

    return factory;

    /**
     * @name login
     * @desc Try to log in with email `email` and password `password`
     * @param {string} username The username
     * @param {string} password The password entered by the user
     * @returns {Promise}
     * @memberOf app.auth.services.AuthService
     */
    function login(username, password) {

      return $http({
        method: 'POST',
        url: braveAuthConfig.getApiUrl() + braveAuthConfig.getResourceName(),
        data: {username: username, password: password},
        headers: {'Content-Type': 'application/json'}
      })
        .success(loginSuccessFn)
        .error(loginErrorFn);

      /**
       * @name loginSuccessFn
       * @param {object} data Data
       * @desc Set the authenticated account and redirect to index
       */
      function loginSuccessFn(data) {
        console.log(data);
        if (typeof data.Item !== 'undefined' && data.Item) {

          authToolsService.authenticate(new UserModel(data.Item));

          var returnToState = $rootScope.returnToState;
          var returnToStateParams = $rootScope.returnToStateParams;

          if (returnToState) {
            $state.go(returnToState, returnToStateParams);
          } else {
            $state.go('app.home');
          }

        } else {
          loginErrorFn();
        }
      }

      /**
       * @name loginErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function loginErrorFn() {
        $state.go($state.current, {message: 'Invalid login or password'});
      }
    }

    /**
     * @name logout
     * @desc Try to log the user out
     * @returns {Promise}
     * @memberOf app.auth.services.AuthService
     */
    function logout() {

      return $http({
        method: 'POST',
        url: braveAuthConfig.apiUrl + '/auth/logout/'
      })
        .then(logoutSuccessFn, logoutErrorFn);

      /**
       * @name logoutSuccessFn
       * @desc Unauthenticate and redirect to index with page reload
       */
      function logoutSuccessFn() {
        AuthService.unauthenticate();
        $state.go('app.home');
      }

      /**
       * @name logoutErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function logoutErrorFn() {
        console.error('Epic failure!');
      }
    }
  }

})();
