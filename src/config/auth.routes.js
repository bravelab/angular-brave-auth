(function () {
  'use strict';


  /**
   * @ngdoc routes
   * @name app [ngBraveAuth]
   * @description Routes configuration ngBraveAuth
   */
  angular
    .module('ngBraveAuth')
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
            templateUrl: 'ngBraveAuth/views/login.html',
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
            templateUrl: 'ngBraveAuth/views/register.html'
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
            templateUrl: 'ngBraveAuth/views/forgot-password.html'
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
            templateUrl: 'ngBraveAuth/views/lock.html'
          }
        },
        data: {
          title: 'Locked Screen',
          htmlId: 'lock-page'
        }
      });

  }

})();
