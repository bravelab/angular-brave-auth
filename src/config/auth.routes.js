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
