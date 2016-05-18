(function() {
  'use strict';

  angular
    .module('app.auth')
    .constant('authConfig', {
      apiUrl: '/api',
      templates: {
        directives: {
          loginInfo: 'bower_components/angular-brave-auth/src/templates/login-info.tpl.html'
        }
      }
    });

}());
