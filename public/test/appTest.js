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
		var eventListenersStub, generateButtonsStub;

		it('initialise', function() {
			eventListenersStub = sinon.stub(ITV, 'eventListeners').returns(["pizza"]);
			generateButtonsStub = sinon.stub(ITV, 'generateButtons');

			ITV.init();

			expect(generateButtonsStub).to.have.been.calledOnce;
			expect(eventListenersStub).to.have.been.calledOnce;

			eventListenersStub.restore();
			generateButtonsStub.restore();
		});
	});

	describe('ajaxITVFeed', function () {
		var xhr, requests, listInfoStub;

		it('can Ajax ITV', function() {

			// xhr = sinon.useFakeXMLHttpRequest();
			// requests = [];

			// xhr.onCreate = function (xhr) {
			//  requests.push(xhr);
			// };

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

			// console.log('something: ', something);

			expect(listInfoStub).to.have.been.calledOnce;
			// xhr.restore();

		});
	});

	describe('generateTemplate', function () {
		var data, addImageStub, newTemplate, addTitleStub, addURLStub, id;

		it('can generateTemplate', function() {

			id = '0';
			data = {
				channel: 'ITV',
				_links: {
					primaryImage: {
						href: 'http://google.co.uk/'
					},
					productions: {
						href: 'http://newLink.com/'
					}
				}
			};

			addURLStub = sinon.stub(ITV, 'addURL', function (data, id) {
				var urlItem = document.createElement('div');
				urlItem.dataset.url = data._links.productions.href;

				return urlItem;
			});

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

			expect(newTemplate.children[0].dataset.url).to.eql('http://newLink.com/');

			expect(newTemplate.children[0].children[0].children[0].className).to.eql('grid-image');
			expect(newTemplate.children[0].children[0].children[0].src).to.eql('http://google.co.uk/');
			expect(newTemplate.children[0].children[0].children[1].className).to.eql('item-title');
			expect(newTemplate.children[0].children[0].children[1].innerHTML).to.eql('ITV');

			expect(addImageStub).to.have.been.calledOnce;
			expect(addTitleStub).to.have.been.calledOnce;


		});
	});

	describe('generateButtons', function () {
		var buttonLists,
			dummyPageWrapper = document.createElement('div');

		dummyPageWrapper.id = 'wrapper';

		beforeEach(function () {
			document.body.appendChild(dummyPageWrapper);

		});

		afterEach(function () {
			document.body.removeChild(dummyPageWrapper);
		});

		it('can make a list of buttons', function () {

			ITV.generateButtons();
			buttonLists = document.querySelector('#wrapper');

			expect(buttonLists.id).to.eql('wrapper');
			expect(buttonLists.children[0].className).to.eql('buttonList');
			expect(buttonLists.children[0].children[1].className).to.eql('categoryButton');
			expect(buttonLists.children[0].children[2].className).to.eql('mostButton');

			expect(buttonLists.children[0].children[0].innerHTML).to.eql('Pick a Channel');
			expect(buttonLists.children[0].children[1].innerHTML).to.eql('Pick a category');
			expect(buttonLists.children[0].children[2].innerHTML).to.eql('Most Popular');
		});
	});

	describe('addURL', function () {
		var newURLItem, newData;

		it('can add url to item', function () {
			newData = {
				channel: 'ITV',
				_links: {
					productions: {
						href: 'http://newLink.com/'
					}
				}
			};

			newURLItem = ITV.addURL(newData, 0);

			// expect(newURLItem.dataset.url).to.be.equal('http://newLink.com/');
		});
	});

	describe('addTitle', function () {
		var newItemTitle, dummyData;

		it('can add a title to item', function () {
			dummyData = {
				programmeTitle: 'ITV'
			};
			newItemTitle = ITV.addTitle(dummyData, 2);

			expect(newItemTitle.innerHTML).to.equal('ITV');
		});
	});

	describe('addImage', function () {
		var newItemImage, someData;

		it('can add image to item', function () {
			someData = {
				_links: {
					image: {
						href: 'http://google.co.uk/'
					}
				}
			};

			newItemImage = ITV.addImage(someData, 2);
			// expect(newItemImage);
		});
	});

	describe('renderMostPop', function () {

		it('can ajax Most Pop', function () {
			ITV.renderMostPop();
		});
	});

	describe('listNewItems', function () {

		it('can ajax new ', function () {
			ITV.listNewItems();
		});
	});

	describe('eventListeners', function () {
		var dummyChannelButton, dummyCategoryButton,
			ajaxITVFeedStub, dummyPopularButton;

		beforeEach(function () {
			dummyChannelButton = document.createElement('div');
			dummyCategoryButton = document.createElement('div');
			dummyPopularButton = document.createElement('div');

			dummyChannelButton.className = 'channelButton';
			dummyCategoryButton.className = 'categoryButton';
			dummyPopularButton.className = 'mostButton';

			document.body.appendChild(dummyChannelButton);
			document.body.appendChild(dummyCategoryButton);
			document.body.appendChild(dummyPopularButton);

		});

		afterEach(function () {
			document.body.removeChild(dummyChannelButton);
			document.body.removeChild(dummyCategoryButton);
			document.body.removeChild(dummyPopularButton);
		});


		it('can added addEventListeners', function () {
			ITV.eventListeners();

			expect(dummyChannelButton.click).to.not.be.undefined;
			expect(dummyCategoryButton.click).to.not.be.undefined;
			expect(dummyPopularButton.click).to.not.be.undefined;
		});

		it('can trigger Event on click', function () {
			var newChannelButton = document.querySelector('.channelButton'),
			e = {
				target: newChannelButton
			};
			ajaxITVFeedStub = sinon.stub(ITV, 'ajaxITVFeed');

			expect(ajaxITVFeedStub).to.have.been.calledOnce;
		});

	});


});