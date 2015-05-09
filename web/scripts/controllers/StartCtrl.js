(function() {
	'use strict';
	var StartCtrl = function(restService, $location) {
		this.restService = restService;
		this.location = $location;
		this.params = this.restService.getParams();
		this.searchError = false;
	};

	StartCtrl.prototype.search = function() {
		if(this.params.search_query.length < 1) {
			this.searchError = true;
			return;
		}
		this.restService.setParams(this.params);
		this.location.path("/search");
	};

	dynamicSearch.controller('StartCtrl', StartCtrl);
}());