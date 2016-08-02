(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app.auth
   * @description app.auth tests
   *
   */
  describe('app.auth module', function () {

    beforeEach(module('app.auth'));

    describe('value - version', function () {

      it('test', function () {
        var x = true;
        expect(x).toEqual(true);
      });

      // it('should return current version', inject(function (braveAuthVersion) {
      //  expect(braveAuthVersion).toEqual('0.0.16');
      // }));

    });

  });
})();
