(function () {

  'use strict';

  angular.module('app.auth').factory('AuthServiceMock', ['$q', function ($q) {
    var factory = {};

    factory.token = '425345934423423j4rwe239uhasd91239182721987';

    return factory;
  }]);

})();
