/**
 * Doc
 * @namespace ngBraveAuth
 */
(function () {
  'use strict';

  angular
    .module('ngBraveAuth')
    .factory('Doc', Doc);

  Doc.$inject = [];

  function Doc() {

    var factory = function (data) {
      this.id = data.id;
      this.title = data.title;
      this.slug = data.slug;
      this.content = data.content;
    };

    return factory;
  }

}());
