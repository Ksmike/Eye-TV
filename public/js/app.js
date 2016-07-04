/* global document: false */
/* global console: false */
/* global XMLHttpRequest: false */


(function(exports) {
	"use strict";

	function EyeTV() {}
	exports.EyeTV = EyeTV;

	EyeTV.prototype = {

	init: function() {
		var ajaxData =  this.ajaxITVFeed(0);

		this.generateButtons();
		for (var i = 0; i < [].length; i++) {
			this.generateTemplate(ajaxData[i]);
		}
	},
	urls: [
		"http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/channels?broadcaster=ITV",
		"http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/categories?broadcaster=ITV",
		"http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/productions?grouping=popular&size=15&broadcaster=ITV"
	],
	headers: [
		"charset=UTF-8, application/vnd.itv.default.channel.v1+hal+json; charset=UTF-8",
		"charset=UTF-8, application/vnd.itv.default.category.v1+hal+json; charset=UTF-8",
		"charset=UTF-8, application/vnd.itv.default.production.v2+hal+json; charset=UTF-8, application/vnd.itv.default.production.v1+hal+json; charset=UTF-8, application/vnd.itv.ctv.production.v1+hal+json; charset=UTF-8, application/vnd.itv.nowtv.production.v1+hal+json; charset=UTF-8, application/vnd.itv.hubsvc.production.fat.v2+hal+json; charset=UTF-8, application/vnd.itv.hubsvc.production.v3+hal+json; charset=UTF-8"
	],
	ajaxITVFeed: function (index) {
	    var xhr = new XMLHttpRequest();
		xhr.open("GET", this.urls[index], true);
		xhr.setRequestHeader("Accept", this.headers[index]);

		xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


		xhr.send();

	},
	generateTemplate: function (data) {
		var	gridItem = document.createElement('div'),
			gridContainer = document.createElement('div'),
			gridImage = document.createElement('img'),
			gridName = document.createElement('div');

		gridItem.classList.add('grid-item');
		gridItem.dataset.id = data.id;

		gridContainer.classList.add('grid-contain');

		gridImage.classList.add('grid-image');
		gridImage.src = data.image;

		gridDesigner.classList.add('designer');
		gridDesigner.innerHTML = data.designer;

		gridName.classList.add('product-name');
		gridName.innerHTML = data.name;

		gridPrice.classList.add('price');
		gridPrice.innerHTML = 'Buy now for - ' + data.price;

		gridItem.appendChild(gridContainer);
		gridContainer.appendChild(gridImage);
		gridContainer.appendChild(gridName);

		return gridItem;
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

		categoryButton.classList.add('categoryButton');
		categoryButton.innerHTML = 'Pick a category';

		mostPopularButton.classList.add('mostButton');
		mostPopularButton.innerHTML = ('Most Popular')

		buttonContainer.appendChild(channelButton);
		buttonContainer.appendChild(categoryButton);
		buttonContainer.appendChild(mostPopularButton);

		pageWrapper.appendChild(buttonContainer);



	}
};

})(this);



window.onload = function() {
	var ITV = new EyeTV();

	ITV.init();
};

