(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthToolsService', AuthToolsService);

  AuthToolsService.$inject = ['$q', '$http', '$timeout', '$sessionStorage'];

  /**
   *
   * @param {Object} $q - q object
   * @param {Object} $http - HTTP object
   * @param {Object} $timeout - Timeout object
   * @param {Object} $sessionStorage - Session Storage
   * @returns {{isIdentityResolved: isIdentityResolved, isAuthenticated: isAuthenticated, isInRole: isInRole, isInAnyRole: isInAnyRole, authenticate: authenticate, identity: identity}}
    * @constructor
    */
  function AuthToolsService($q, $http, $timeout, $sessionStorage) {

    var _identity = null,
      _authenticated = false;

    return {
      isIdentityResolved: function() {
        return angular.isDefined(_identity);
      },
      isAuthenticated: function() {
        return _authenticated;
      },
      isInRole: function(role) {
        if (!_authenticated || !_identity.roles) {
          return false;
        }

        return _identity.roles.indexOf(role) !== -1;
      },
      isInAnyRole: function(roles) {
        if (!_authenticated || !_identity.roles) {
          return false;
        }

        for (var i = 0; i < roles.length; i++) {
          if (this.isInRole(roles[i])) {
            return true;
          }
        }

        return false;
      },
      authenticate: function(identity) {
        _identity = identity;
        _authenticated = identity != null;
        if (identity) {
          $sessionStorage.loggedUser = angular.toJson(identity);
        } else {
          $sessionStorage.loggedUser = null;
        }
      },
      identity: function(force) {
        var deferred = $q.defer();

        // ?
        if (force === true) {
          _identity = null;
        }

        _identity = angular.fromJson($sessionStorage.loggedUser);
        this.authenticate(_identity);
        deferred.resolve(_identity);

        return deferred.promise;
      }
    };
  }

})();
