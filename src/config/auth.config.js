(function() {
  'use strict';

  angular
    .module('app.auth')
    .constant('authConfig', {
      apiUrl: '/api',
      templates: {
        views: {
          login: 'bower_components/angular-brave-auth/src/templates/login.tpl.html',
          register: 'bower_components/angular-brave-auth/src/templates/register.tpl.html',
          forgotPassword: 'bower_components/angular-brave-auth/src/templates/forgot-password.tpl.html',
          lock: 'bower_components/angular-brave-auth/src/templates/lock.tpl.html'
        },
        directives: {
          loginInfo: 'bower_components/angular-brave-auth/src/templates/login-info.tpl.html'
        }
      }
    });

}());

