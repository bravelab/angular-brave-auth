(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('UserModel', UserModel);

  UserModel.$inject = ['BraveAuthConfig'];

  function UserModel(braveAuthConfig) {

    return function (data) {

      if (typeof data.username !== 'undefined') {
        this.username = data[braveAuthConfig.getUsernameField()];
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


