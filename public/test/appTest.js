/* global require: false */
/* global es6: false */
/* global mocha: false */
/* global chai: false */
/* global sinon: false */
/* global describe: false */
/* global beforeEach: false */
/* global it: false */
/* global Swifty: false */
/*esversion: 6*/

'use strict';

var expect = chai.expect;

describe('EyeTV', function() {
	var ITV;

	beforeEach(function () {
		ITV = new EyeTV();
	});

	describe('init', function() {


		it('is defined', function() {
			expect(ITV).to.not.be.undefined;
		});
	});


});