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

  routes.$inject = ['$stateProvider', 'authConfig'];

  /**
   *
   * @param {object} $stateProvider StateProvider
   * @param {object} authConfig App config
   */
  function routes($stateProvider, authConfig) {

    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          root: {
            templateUrl: function() {
              return authConfig.templates.views.login;
            },
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
            templateUrl: function() {
              return authConfig.templates.views.register;
            }
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
            templateUrl: function() {
              return authConfig.templates.views.forgotPassword;
            }
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
            templateUrl: function () {
              return authConfig.templates.views.lock;
            }
          }
        },
        data: {
          title: 'Locked Screen',
          htmlId: 'lock-page'
        }
      });

  }

})();
