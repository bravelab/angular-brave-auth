(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.auth]
   * @description Auth module of the application.
   */
  angular.module('app.auth', ['ui.router', 'ngCookies', 'ngStorage'])
    .value('braveAuthVersion', '0.0.19');

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
    this.usernameFieldType = 'email'; // form template
    this.usernameFieldName = 'username'; // api field name
    this.logo = {
      'src': '../../../styles/img/logo.png',
      'alt': 'Angular Brave Auth',
      'title': 'Angular Brave Auth'
    };

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
      var usernameFieldType = this.usernameFieldType;
      var usernameFieldName = this.usernameFieldName;
      var logo = this.logo;

      return {
        getApiUrl: function () {
          return apiUrl;
        },
        getResourceName: function () {
          return resourceName;
        },
        getTemplates: function () {
          return templates;
        },
        getUsernameFieldType: function () {
          return usernameFieldType;
        },
        getUsernameFieldName: function () {
          return usernameFieldName;
        },
        getUsernameFieldTemplate: function () {
          return 'bower_components/angular-brave-auth/src/templates/fields/username/' + usernameFieldType + '.html';
        },
        getLogo: function () {
          return logo;
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
    this.setUsernameFieldType = function (usernameFieldType) {
      this.usernameFieldType = usernameFieldType;
    };
    this.setUsernameField = function (usernameField) {
      console.log('angular-brave-auth: setUsernameField is deprecated, please use setUsernameFieldType to set type ' +
        'and setUusernameFieldName to set api field name');
      this.setUsernameFieldType(usernameField);
    };
    this.setUsernameFieldName = function (usernameFieldName) {
      this.usernameFieldName = usernameFieldName;
    };
    this.setLogo = function (logo) {
      this.logo = logo;
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
   * @param {Object} $stateProvider - state provider
   * @param {Object} braveAuthConfig - Auth config
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

  LoginController.$inject = ['$location', '$stateParams', '$scope', 'AuthService', 'BraveAuthConfig'];
  /**
   *
   * @param {object} $location location
   * @param {object} $stateParams location
   * @param {object} $scope scope
   * @param {object} authService AuthService object
   * @param {object} braveAuthConfig BraveAuthConfigProvider object
   * @constructor
     */
  function LoginController($location, $stateParams, $scope, authService, braveAuthConfig) {

    var vm = this;

    vm.login = login;
    vm.message = $stateParams.message; // TODO nkler: check if it works with $state.go($state.current ...)
    vm.usernameFieldTemplate = braveAuthConfig.getUsernameFieldTemplate();
    vm.logo = braveAuthConfig.getLogo();

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


(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.auth]
   * @description braveAuthJWTHttpInterceptor directive
   */
  angular
    .module('app.auth')
    .factory('braveAuthJWTHttpInterceptor', function ($sessionStorage) {
      return {
        'request': function (config) {
          var loggedUser = angular.fromJson($sessionStorage.loggedUser);
          config.headers = config.headers || {};
          if (angular.isDefined(loggedUser.token) && loggedUser.token) {
            config.headers.Authorization = 'JWT ' + loggedUser.token;
          }
          return config;
        }
      };
    });

})();

(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('UserModel', UserModel);

  UserModel.$inject = ['BraveAuthConfig'];

  function UserModel(braveAuthConfig) {

    return function (data) {

      if (typeof data.username !== 'undefined') {
        this.username = data[braveAuthConfig.getUsernameFieldName()];
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

  AuthService.$inject = ['$sessionStorage', '$state', '$rootScope', '$localStorage', '$q', '$http', 'BraveAuthConfig', 'AuthToolsService', 'UserModel'];

  /**
   *
   * @param {Object} $sessionStorage - Session storage
   * @param {Object} $state - State
   * @param {Object} $rootScope - Root Scope
   * @param {Object} $localStorage - Local Storage
   * @param {Object} $q - Query an object
   * @param {Object} $http - HTPP Object
   * @param {Object} braveAuthConfig - Config provider
   * @param {Object} authToolsService - Auth Service
   * @param {Object} UserModel - User model
   * @returns {{login: app.auth.services.AuthService.login, logout: app.auth.services.AuthService.logout}} Object
   * @constructor
   */
  function AuthService($sessionStorage, $state, $rootScope, $localStorage, $q, $http, braveAuthConfig, authToolsService, UserModel) {

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

      var validationData = {};
      validationData[braveAuthConfig.getUsernameFieldName()] = username;
      validationData.password = password;

      return $http({
        method: 'POST',
        url: braveAuthConfig.getApiUrl() + braveAuthConfig.getResourceName(),
        data: validationData,
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
        url: braveAuthConfig.getApiUrl() + '/auth/logout/'
      })
        .then(logoutSuccessFn, logoutErrorFn);

      /**
       * @name logoutSuccessFn
       * @desc Unauthenticate and redirect to index with page reload
       */
      function logoutSuccessFn(response) {

        // clear session storage
        $sessionStorage.$reset();
        $localStorage.$reset();

        if (angular.isDefined(response.logoutRedirectUrl)) {
          window.location.href = response.logoutRedirectUrl;
        }

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
   * @param {Object} $q - q object
   * @param {Object} $http - HTTP object
   * @param {Object} $timeout - Timeout object
   * @param {Object} $sessionStorage - Session Storage
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

        // ?
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
