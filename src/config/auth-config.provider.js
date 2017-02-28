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
      console.log('setUsernameField is deprecated, please use setUsernameFieldType to set type ' +
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
