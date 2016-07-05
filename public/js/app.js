/* global document: false */
/* global console: false */
/* global XMLHttpRequest: false */


(function(exports) {
	"use strict";

	function EyeTV() {}
	exports.EyeTV = EyeTV;

	EyeTV.prototype = {

	init: function() {
		this.generateButtons();
		this.eventListeners();
	},
	urls: [
		"http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/channels?broadcaster=ITV",
		"http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/categories?broadcaster=ITV",
		"http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/productions?grouping=popular&size=15&broadcaster=ITV"
	],
	headers: [
		"application/vnd.itv.default.channel.v1+hal+json; charset=UTF-8",
		"application/vnd.itv.default.category.v1+hal+json; charset=UTF-8",
		"application/vnd.itv.default.production.v2+hal+json; charset=UTF-8, application/vnd.itv.default.production.v1+hal+json; charset=UTF-8, application/vnd.itv.ctv.production.v1+hal+json; charset=UTF-8, application/vnd.itv.nowtv.production.v1+hal+json; charset=UTF-8, application/vnd.itv.hubsvc.production.fat.v2+hal+json; charset=UTF-8, application/vnd.itv.hubsvc.production.v3+hal+json; charset=UTF-8"
	],
	ajaxITVFeed: function (evt) {
	    var xhr = new XMLHttpRequest(),
	    	responceJSON,
	    	dataID = evt.target.dataset.id;

		xhr.open("GET", this.urls[dataID], true);
		xhr.setRequestHeader("Accept", this.headers[dataID]);
		xhr.send();
		xhr.onload = function () {
		    if (xhr.readyState === xhr.DONE) {
		        if (xhr.status === 200) {
		            responceJSON = JSON.parse(xhr.response);
		            this.listInfo(responceJSON, dataID);
		        }
		    }
		}.bind(this);
	},
	listInfo: function (res, id) {
		console.log('res: ', res);
		var trimData = res._embedded,
			extention, cardItem;

		if (id === '0') {
			extention = res._embedded.channels;
			for (var i = 0; i < extention.length; i++) {
				cardItem = this.generateTemplate(extention[i], id);
				document.querySelector('.channel-container').appendChild(cardItem);
			}
		} else if (id === '1') {
			extention = res._embedded.categories;
			for (var i = 0; i < extention.length; i++) {
				cardItem = this.generateTemplate(extention[i], id);
				document.querySelector('.category-container').appendChild(cardItem);
			}
		} else if (id === '2'){
			extention = res._embedded.productions;
			for (var i = 0; i < extention.length; i++) {
				cardItem = this.generateTemplate(extention[i], id);
				document.querySelector('.most-container').appendChild(cardItem);
			}
		} else {
			return;
		}

	},
	generateTemplate: function (data, id) {
		var	gridItem = document.createElement('li'),
			gridContainer = document.createElement('div'),
			gridImage, gridName, gridLink;
		console.log('data: ', data);
		gridItem.classList.add('grid-item');
		gridContainer.classList.add('grid-contain');

		gridLink = this.addURL(data, id);
		gridLink.addEventListener('click', this.renderMostPop.bind(this), false);

		gridImage = this.addImage(data, id);
		gridImage.classList.add('grid-image');

		gridName = this.addTitle(data, id);
		gridName.classList.add('item-title');

		gridItem.appendChild(gridContainer);
		if (gridImage.src) {
			gridContainer.appendChild(gridImage);
		}

		gridItem.appendChild(gridLink);
		gridLink.appendChild(gridContainer);
		gridContainer.appendChild(gridName);

		return gridItem;
	},
	renderMostPop: function (evt) {
		var xhr = new XMLHttpRequest(),
	    	responceJSON,
	    	url = evt.target.parentElement.parentElement.dataset.url,
	    	id = evt.target.parentElement.parentElement.dataset.index;
		xhr.open("GET", url, true);
		xhr.setRequestHeader("Accept", this.headers[2]);
		xhr.send();
		xhr.onload = function () {
		    if (xhr.readyState === xhr.DONE) {
		        if (xhr.status === 200) {
		            responceJSON = JSON.parse(xhr.response);
		            this.listNewItems(responceJSON, id);
		        }
		    }
		}.bind(this);
	},
	listNewItems: function (res) {
		var trimmed = res._embedded, cardItem;

		for (var i = 0; i < trimmed.productions.length; i++) {
			cardItem = this.generateTemplate(trimmed.productions[i], '2');
			document.querySelector('.new-container').appendChild(cardItem);
		}
	},
	addURL:function (data, id) {
		var itemLink = document.createElement('div');
		itemLink.classList.add('data-url');
		if (id === '0' || id === '1') {
			itemLink.dataset.url = data._links.productions.href;
			itemLink.dataset.index = '2';
		} else {
			return itemLink;
		}

		return itemLink;
	},
	addTitle: function (data, id) {

		var gridName = document.createElement('div');

		if (id === '0') {
			gridName.innerHTML = data.channel;
		} else if (id === '1') {
			gridName.innerHTML = data.name;
		} else {
			gridName.innerHTML = data.programmeTitle;
		}
		return gridName;
	},
	addImage: function (data, id) {

		var gridImage = document.createElement('img');
		if (id === '0') {
			gridImage.src = data._links.primaryImage.href;
		} else if (id === '2') {
			gridImage.src = data._links.image.href;
		}

		return gridImage;
	},
	generateButtons: function () {
		var buttonContainer = document.createElement('div'),
			channelButton = document.createElement('div'),
			categoryButton = document.createElement('div'),
			mostPopularButton = document.createElement('div'),
			pageWrapper = document.querySelector('#wrapper');

		buttonContainer.classList.add('buttonList');
		channelButton.classList.add('channelButton');
		channelButton.innerHTML = 'Pick a Channel';
		channelButton.dataset.id = '0';

		categoryButton.classList.add('categoryButton');
		categoryButton.innerHTML = 'Pick a category';
		categoryButton.dataset.id = '1';

		mostPopularButton.classList.add('mostButton');
		mostPopularButton.innerHTML = ('Most Popular');
		mostPopularButton.dataset.id = '2';

		buttonContainer.appendChild(channelButton);
		buttonContainer.appendChild(categoryButton);
		buttonContainer.appendChild(mostPopularButton);

		pageWrapper.appendChild(buttonContainer);

	},
	eventListeners: function () {
		var channelButtonListner,
			categoryButtonListener,
			mostPopularButtonListener;

		channelButtonListner = document.querySelector('.channelButton');
		categoryButtonListener = document.querySelector('.categoryButton');
		mostPopularButtonListener = document.querySelector('.mostButton');

		channelButtonListner.addEventListener('click', this.ajaxITVFeed.bind(this), false);
		categoryButtonListener.addEventListener('click', this.ajaxITVFeed.bind(this), false);
		mostPopularButtonListener.addEventListener('click', this.ajaxITVFeed.bind(this), false);
	}
};

})(this);



window.onload = function() {
	var ITV = new EyeTV();

	ITV.init();
};

