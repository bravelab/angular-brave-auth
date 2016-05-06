(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ngBraveAuth
   * @description ngBraveAuth tests
   *
   */
  describe('ngBraveAuth module', function () {

    beforeEach(module('ngBraveAuth'));

    describe('value - version', function () {

      it ('test', function() {
        var x = true;
        expect(x).toEqual(true);
      });


      // it('should return current version', inject(function (version) {
      //   expect(version).toEqual('0.0.1');
      // }));
    });

  });
})();

