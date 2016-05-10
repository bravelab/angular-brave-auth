(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.auth]
   * @description Auth module of the application.
   */
  angular.module('app.auth', ['ui.router', 'ngCookies'])
    .value('version', '0.0.4')
    .constant('authKeys', {
      googleClientId: '',
      facebookAppId: ''
    })
    .constant('APP_CONFIG', {
      apiUrl: '/api'
    });

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

  routes.$inject = ['$stateProvider'];

  /**
   *
   * @param {object} $stateProvider StateProvider
   */
  function routes($stateProvider) {

    $stateProvider

      .state('login', {
        url: '/login',
        views: {
          root: {
            templateUrl: 'app.auth/views/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
          }
        },
        data: {
          title: 'Login',
          htmlId: 'extr-page'
        },
        resolve: {
          srcipts: function (lazyScript) {
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
          srcipts: function (lazyScript) {
            return lazyScript.register([
              'build/vendor.ui.js'
            ]);
          }
        }
      })

      .state('register', {
        url: '/register',
        views: {
          root: {
            templateUrl: 'app.auth/views/register.html'
          }
        },
        data: {
          title: 'Register',
          htmlId: 'extr-page'
        }
      })

      .state('forgotPassword', {
        url: '/forgot-password',
        views: {
          root: {
            templateUrl: 'app.auth/views/forgot-password.html'
          }
        },
        data: {
          title: 'Forgot Password',
          htmlId: 'extr-page'
        }
      })

      .state('lock', {
        url: '/lock',
        views: {
          root: {
            templateUrl: 'app.auth/views/lock.html'
          }
        },
        data: {
          title: 'Locked Screen',
          htmlId: 'lock-page'
        }
      });

  }

})();

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$scope', 'AuthService'];

  /**
   *
   * @param {object} $location location
   * @param {object} $scope scope
   * @param {object} authService AuthService object
   * @constructor
     */
  function LoginController($location, $scope, authService) {
    var vm = this;

    vm.login = login;

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf app.auth.LoginController
     */
    function activate() {
      // If the user is authenticated, they should not be here.
      // if (authService.isAuthenticated()) {
      //    $location.url('/');
      // }
    }

    /**
     * @name login
     * @desc Log the user in
     * @memberOf app.auth.LoginController
     */
    function login() {
      authService.login(vm.username, vm.password);
    }

    /**
     $scope.$on('event:google-plus-signin-success', function (event, authResult) {
      if (authResult.status.method == 'PROMPT') {
        GooglePlus.getUser().then(function (user) {
          User.username = user.name;
          User.picture = user.picture;
          $state.go('app.dashboard');
        });
      }
    });

    $scope.$on('event:facebook-signin-success', function (event, authResult) {
      ezfb.api('/me', function (res) {
        User.username = res.name;
        User.picture = 'https://graph.facebook.com/' + res.id + '/picture';
        $state.go('app.dashboard');
      });
    });*/
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
   * @description facebookSignin directive
   */
  angular.module('app.auth').directive('facebookSignin', function ($rootScope, ezfb) {
    return {
      replace: true,
      restrict: 'E',
      template: '<a class="btn btn-block btn-social btn-facebook"><i class="fa fa-facebook"></i> Sign in with Facebook</a>',
      link: function (scope, element) {
        element.on('click', function () {
          ezfb.login(function (res) {
            if (res.authResponse) {
              $rootScope.$broadcast('event:facebook-signin-success', res.authResponse);
            }
          }, {scope: 'public_profile'});
        });
      }
    };
  });

})();

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.auth]
   * @description googleSignin directive
   */
  angular.module('app.auth').directive('googleSignin', function ($rootScope, GooglePlus) {
    return {
      restrict: 'E',
      template: '<a class="g-signin btn btn-block btn-social btn-google-plus"><i class="fa fa-google-plus"></i> Sign in with Google</a>',
      replace: true,
      link: function (scope, element) {
        element.on('click', function () {
          GooglePlus.login().then(function (authResult) {
            $rootScope.$broadcast('event:google-plus-signin-success', authResult);

          }, function (err) {
            $rootScope.$broadcast('event:google-plus-signin-failure', err);

          });
        });
      }
    };
  });

})();

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

/**
 * Doc
 * @namespace app.auth
 */
(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('Doc', Doc);

  Doc.$inject = [];

  function Doc() {

    var factory = function (data) {
      this.id = data.id;
      this.title = data.title;
      this.slug = data.slug;
      this.content = data.content;
    };

    return factory;
  }

}());

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
