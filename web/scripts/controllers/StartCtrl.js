(function() {
	'use strict';
	var StartCtrl = function(restService, $location) {
		this.restService = restService;
		this.location = $location;

		this.params = this.restService.getDefaultParams();
		this.searchError = false;
	};

	StartCtrl.prototype.search = function() {
		if(this.params.search_query.length < 1) {
			this.searchError = true;
			return;
		}
		this.location.path("/search").search(this.params);
	};

	dynamicSearch.controller('StartCtrl', StartCtrl);
}());