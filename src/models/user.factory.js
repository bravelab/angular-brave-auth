(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('User', User);

  User.$inject = ['$http', '$q', 'authConfig'];

  function User($http, $q, authConfig) {
    var dfd = $q.defer();

    var UserModel = {
      initialized: dfd.promise,
      username: 'undefined',
      picture: 'undefined'
    };

    $http.get(authConfig.apiUrl + '/user.json').then(function (response) {
      UserModel.username = response.data.username;
      UserModel.picture = response.data.picture;
      dfd.resolve(UserModel);
    });

    return UserModel;
  }

}());
