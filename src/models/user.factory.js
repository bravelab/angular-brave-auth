/**
 * Doc
 * @namespace app.auth
 */
(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('User', User);

  User.$inject = [];

  function User() {

    var factory = function (data) {
      this.id = data.id;
    };

    return factory;
  }

}());
