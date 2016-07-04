"use strict";

(function(exports) {

	function EyeTV() {}
	exports.EyeTV = EyeTV;

	EyeTV.prototype = {
	init: function() {

		this.getChannels();
	},
	getChannels: function () {

	}
  };

})(this);


window.onload = function() {
	var ITV = new EyeTV;

	ITV.init();
};

