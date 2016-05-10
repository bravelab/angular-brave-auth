(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$cookies', '$localStorage', '$q', '$http', 'APP_CONFIG'];

  /**
   *
   * @param {object} $cookies Cookies
   * @param {object} $localStorage LocalStorage
   * @param {object} $q Query object
   * @param {object} $http Http object
   * @param {object} APP_CONFIG Module config
   * @desc Docs module for SmartAdmin
   * @returns {{login: app.auth.services.AuthService.login, logout: app.auth.services.AuthService.logout, register: app.auth.services.AuthService.register, unauthenticate: app.auth.services.AuthService.unauthenticate, isAuthenticated: app.auth.services.AuthService.isAuthenticated, getAuthenticatedAccount: app.auth.services.AuthService.getAuthenticatedAccount, setAuthenticatedAccount: app.auth.services.AuthService.setAuthenticatedAccount, getToken: app.auth.services.AuthService.getToken}}
   * @constructor
   */
  function AuthService($cookies, $localStorage, $q, $http, APP_CONFIG) {


    /**
     * @name AuthService
     * @desc The Factory to be returned
     */
    var factory = {
      login: login,
      logout: logout,
      register: register,
      unauthenticate: unauthenticate,
      isAuthenticated: isAuthenticated,
      getAuthenticatedAccount: getAuthenticatedAccount,
      setAuthenticatedAccount: setAuthenticatedAccount,
      getToken: getToken
    };

    return factory;

    /**
     * @name register
     * @desc Try to register a new user
     * @param {string} email The email entered by the user
     * @param {string} password The password entered by the user
     * @param {string} username The username entered by the user
     * @returns {Promise}
     * @memberOf app.auth.services.AuthService
     */
    function register(email, password, username) {
      return $http.post('/api/accounts/', {
        email: email,
        username: username,
        password: password
      });
    }

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
        url: APP_CONFIG.apiUrl + '/auth/login/',
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
        AuthService.setAuthenticatedAccount(data);
        window.location = '/';
      }

      /**
       * @name loginErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function loginErrorFn() {
        console.error('Epic failure!');
      }
    }

    /**
     * @name getAuthenticatedAccount
     * @desc Return the currently authenticated account
     * @returns {object|undefined} Account if authenticated, else `undefined`
     * @memberOf app.auth.services.AuthService
     */
    function getAuthenticatedAccount() {
      if (!$cookies.get('authenticatedAccount')) {
        return;
      }

      return JSON.parse($cookies.get('authenticatedAccount'));
    }

    /**
     * @name isAuthenticated
     * @desc Check if the current user is authenticated
     * @returns {boolean} True is user is authenticated, else false.
     * @memberOf app.auth.services.AuthService
     */
    function isAuthenticated() {
      return !!$cookies.get('authenticatedAccount');
    }

    /**
     * @name setAuthenticatedAccount
     * @desc Stringify the account object and store it in a cookie
     * @param {Object} user The account object to be stored
     * @returns {undefined}
     * @memberOf app.auth.services.AuthService
     */
    function setAuthenticatedAccount(user) {
      $cookies.put('authenticatedAccount', JSON.stringify(user));
    }

    /**
     * @name unauthenticate
     * @desc Delete the cookie where the user object is stored
     * @returns {undefined}
     * @memberOf app.auth.services.AuthService
     */
    function unauthenticate() {
      $cookies.remove('authenticatedAccount');
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
        url: APP_CONFIG.apiUrl + '/auth/logout/'
      })
        .then(logoutSuccessFn, logoutErrorFn);

      /**
       * @name logoutSuccessFn
       * @desc Unauthenticate and redirect to index with page reload
       */
      function logoutSuccessFn() {
        AuthService.unauthenticate();
        window.location = '/#/login?logged-out';
      }

      /**
       * @name logoutErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function logoutErrorFn() {
        console.error('Epic failure!');
      }
    }

    /**
     * @name getToken
     * @desc Get saved token from local storage or call API for one
     * @returns {Promise}
     * @memberOf app.auth.services.AuthService
     */
    function getToken() {
      var deferred = $q.defer();
      if ($localStorage.token) {
        deferred.resolve($localStorage.token);
      } else {
        $http({
          method: 'POST',
          url: APP_CONFIG.apiUrl + '/token?api_key=' + APP_CONFIG.apiKey
        })
          .then(function (data) {
            $localStorage.token = data.data.token;
            deferred.resolve($localStorage.token);
          }, function (data) {
            delete $localStorage.token;
            deferred.reject(data);
          });
      }
      return deferred.promise;
    }
  }
})();
