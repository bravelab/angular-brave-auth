(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.auth]
   * @description Auth module of the application.
   */
  angular.module('app.auth', ['ui.router', 'ngCookies', 'ngStorage'])
    .value('version', '0.0.10');

})();

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name brave [app.auth]
   * @description Config provider for app.auth
   */

  angular
    .module('app.auth')
    .provider('BraveAuthConfig', BraveAuthConfig);

  function BraveAuthConfig() {

    this.apiUrl = '/api';
    this.resourceName = '/auth/login/';

    this.templates = {
      views: {
        login: 'bower_components/angular-brave-auth/src/templates/login.tpl.html'
      },
      directives: {
        loginInfo: 'bower_components/angular-brave-auth/src/templates/login-info.tpl.html'
      }
    };

    this.$get = function () {

      var apiUrl = this.apiUrl;
      var templates = this.templates;
      var resourceName = this.resourceName;

      return {
        getApiUrl: function () {
          return apiUrl;
        },
        getResourceName: function () {
          return resourceName;
        },
        getTemplates: function () {
          return templates;
        }
      };
    };

    this.setApiUrl = function (apiUrl) {
      this.apiUrl = apiUrl;
    };
    this.setResourceName = function (resourceName) {
      this.resourceName = resourceName;
    };
    this.setTemplates = function (templates) {
      this.templates = templates;
    };
  }

})();

(function () {
  'use strict';


  /**
   * @ngdoc routes
   * @name app [app.auth]
   * @description Routes configuration app.auth
   */
  angular
    .module('app.auth')
    .config(routes);

  routes.$inject = ['$stateProvider', 'BraveAuthConfigProvider'];

  /**
   *
   * @param $stateProvider
   * @param braveAuthConfig
     */
  function routes($stateProvider, braveAuthConfig) {

    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          root: {
            templateUrl: function() {
              return braveAuthConfig.templates.views.login;
            },
            controller: 'LoginController',
            controllerAs: 'vm'
          }
        },
        data: {
          title: 'Login',
          htmlId: 'extr-page'
        },
        resolve: {
          scripts: function (lazyScript) {
            return lazyScript.register([
              'build/vendor.ui.js'
            ]);
          }
        }
      })

      .state('logout', {
        url: '/logout',
        views: {
          root: {
            controller: 'LogoutController'
          }
        },
        data: {
          title: 'Logout',
          htmlId: 'extr-page'
        },
        resolve: {
          scripts: function (lazyScript) {
            return lazyScript.register([
              'build/vendor.ui.js'
            ]);
          }
        }
      });
  }

})();

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

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.auth]
   * @ Logout controller
   */
  angular
    .module('app.auth')
    .controller('LogoutController', LogoutController);

  LogoutController.$inject = ['AuthService'];

  /**
   *
   * @param {object} authService AuthService object
   * @description Auth service
   * @constructor
   */
  function LogoutController(authService) {
    authService.logout();
  }

})();


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

(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('UserModel', UserModel);

  function UserModel() {

    return function (data) {

      if (typeof data.username !== 'undefined') {
        this.username = data.username;
      }

      if (typeof data.roles !== 'undefined') {
        this.roles = data.roles;
      }

      if (typeof data.token !== 'undefined') {
        this.token = data.token;
      }

      if (typeof data.userdata !== 'undefined') {
        this.userdata = data.userdata;
      }

      if (typeof data.picture !== 'undefined') {
        this.picture = data.picture;
      }
    };
  }

}());

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

(function () {

  'use strict';

  angular.module('app.auth').factory('AuthServiceMock', ['$q', function ($q) {
    var factory = {};

    factory.token = '425345934423423j4rwe239uhasd91239182721987';

    return factory;
  }]);

})();

(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$cookies', '$state', '$rootScope', '$localStorage', '$q', '$http', 'BraveAuthConfig', 'AuthToolsService', 'UserModel'];

  /**
   *
   * @param $cookies
   * @param $state
   * @param $localStorage
   * @param $q
   * @param $http
   * @param braveAuthConfig
   * @param authToolsService
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

(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthToolsService', AuthToolsService);

  AuthToolsService.$inject = ['$q', '$http', '$timeout', '$sessionStorage'];

  /**
   *
   * @param $q
   * @param $http
   * @param $timeout
   * @param $sessionStorage
   * @returns {{isIdentityResolved: isIdentityResolved, isAuthenticated: isAuthenticated, isInRole: isInRole, isInAnyRole: isInAnyRole, authenticate: authenticate, identity: identity}}
     * @constructor
     */
  function AuthToolsService($q, $http, $timeout, $sessionStorage) {

    var _identity = null,
      _authenticated = false;

    return {
      isIdentityResolved: function() {
        return angular.isDefined(_identity);
      },
      isAuthenticated: function() {
        return _authenticated;
      },
      isInRole: function(role) {
        if (!_authenticated || !_identity.roles) {
          return false;
        }

        return _identity.roles.indexOf(role) !== -1;
      },
      isInAnyRole: function(roles) {
        if (!_authenticated || !_identity.roles) {
          return false;
        }

        for (var i = 0; i < roles.length; i++) {
          if (this.isInRole(roles[i])) {
            return true;
          }
        }

        return false;
      },
      authenticate: function(identity) {
        _identity = identity;
        _authenticated = identity != null;

        if (identity) {
          $sessionStorage.loggedUser = angular.toJson(identity);
        } else {
          $sessionStorage.loggedUser = null;
        }
      },
      identity: function(force) {
        var deferred = $q.defer();

        if (force === true) {
          _identity = null;
        }

        _identity = angular.fromJson($sessionStorage.loggedUser);
        this.authenticate(_identity);
        deferred.resolve(_identity);

        return deferred.promise;
      }
    };
  }

})();
