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

	it('is defined', function() {
		expect(ITV).to.not.be.undefined;
	});

	describe('init', function () {
		var addEventListenerStub, generateButtonsStub;

		it('initialise', function() {
			addEventListenerStub = sinon.stub(ITV, 'addEventListener').returns(["pizza"]);
			generateButtonsStub = sinon.stub(ITV, 'generateButtons');

			ITV.init();

			expect(generateButtonsStub).to.have.been.calledOnce;
			expect(addEventListenerStub).to.have.been.calledOnce;

			addEventListenerStub.restore();
			generateButtonsStub.restore();
		});
	});

	describe('ajaxITVFeed', function () {
		var xhr, requests, listInfoStub;

		it('can Ajax ITV', function() {

			xhr = sinon.useFakeXMLHttpRequest();
			requests = [];

			xhr.onCreate = function (xhr) {
			 requests.push(xhr);
			};

			listInfoStub = sinon.stub(ITV, 'listInfo');

			ITV.url = ['http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/channels?broadcaster=ITV'];
			ITV.header = ['application/vnd.itv.default.channel.v1+hal+json; charset=UTF-8'];


			var evt = {
				target: {
					dataset: {
						id: 1
					}
				}
			};

			ITV.ajaxITVFeed(evt);

			expect(listInfoStub).to.have.been.calledOnce;
			xhr.restore();

		});
	});

	describe('generateTemplate', function () {
		var data, addImageStub, newTemplate, addTitleStub, id;

		it('can generateTemplate', function() {

			id = '0';
			data = {
				channel: 'ITV',
				_links: {
					primaryImage: {
						href: 'http://google.co.uk/'
					}
				}
			};

			addImageStub = sinon.stub(ITV, 'addImage', function (data, id) {
				var imageItem = document.createElement('img');
				imageItem.src = data._links.primaryImage.href;

				return imageItem;
			});
			addTitleStub = sinon.stub(ITV, 'addTitle', function (data, id) {
				var titleItem = document.createElement('div');
				titleItem.innerHTML = data.channel;
				return titleItem;
			});

			newTemplate = ITV.generateTemplate(data, id);

			expect(newTemplate.className).to.eql('grid-item');

			expect(newTemplate.children[0].className).to.eql('grid-contain');

			expect(newTemplate.children[0].children[0].className).to.eql('grid-image');
			expect(newTemplate.children[0].children[0].src).to.eql('http://google.co.uk/');
			expect(newTemplate.children[0].children[1].className).to.eql('item-title');
			expect(newTemplate.children[0].children[1].innerHTML).to.eql('ITV');


		});
	});




});