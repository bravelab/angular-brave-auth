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
    this.usernameField = 'email';
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
      var usernameField = this.usernameField;
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
        getUsernameField: function () {
          return usernameField;
        },
        getUsernameFieldTemplate: function () {
          return 'bower_components/angular-brave-auth/src/templates/fields/username/' + usernameField + '.html';
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
    this.setUsernameField = function (usernameField) {
      this.usernameField = usernameField;
    };
    this.setLogo = function (logo) {
      this.logo = logo;
    };
  }

})();
