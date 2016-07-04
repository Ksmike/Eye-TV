/* global require: false */
/* global es6: false */
/* global mocha: false */
/* global chai: false */
/* global sinon: false */
/* global describe: false */
/* global beforeEach: false */
/* global it: false */
/* global EyeTV: false */
/*esversion: 6*/

'use strict';

var expect = chai.expect;

describe('EyeTV', function () {
	var ITV;

	beforeEach(function () {
		ITV = new EyeTV();
	});

	describe('init', function () {
		var ajaxITVFeedStub, generateTemplateStub;

		it('is defined', function() {
			expect(ITV).to.not.be.undefined;
		});

		it('initialise', function() {
			ajaxITVFeedStub = sinon.stub(ITV, 'ajaxITVFeed').returns(["pizza"]);
			generateTemplateStub = sinon.stub(ITV, 'generateTemplate');
			ITV.init();

			expect(ajaxITVFeedStub)

			expect(generateTemplateStub).to.have.been.calledOnce;
			expect(ajaxITVFeedStub).to.have.been.calledOnce;
		});
	});

	describe('ajaxITVFeed', function () {
		var xhr;
		beforeEach(function () {
			console.log('sinon: ', sinon);
			// xhr = sinon.useFakeXMLHttpRequest();
		});

		afterEach(function () {
			// xhr.restore();
		});

		it('is defined', function() {
			ITV.ajaxITVFeed(0);
		});
	});


});