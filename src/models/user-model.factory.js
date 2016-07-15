(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('UserModel', UserModel);

  function UserModel() {

    return function (data) {

      if (typeof data.username !== 'undefined') {
        this.username = data.username;
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
