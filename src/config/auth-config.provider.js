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
