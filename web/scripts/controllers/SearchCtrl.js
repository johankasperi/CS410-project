(function() {
	'use strict';
	var SearchCtrl = function(restService) {
		this.restService = restService;
		this.results = [];

		this.currentPage = 0;
		this.pages = 0;
		this.startPage = 0;
		this.endPage = 0;

		this.loading = false;
		this.params = this.restService.getParams();

		this.search();
	};

	SearchCtrl.prototype.search = function() {
		this.restService.setParams(this.params);
		this.loading = true;
		var self = this;
		this.restService.search(function(err, result) {
			self.loading = false;
			if(err) {

			}
			else {
				self.currentPage = result.page;
				self.pages = result.pages
				self.setupPager();

				self.results = result.results;
				console.log(self.results);
			}
		});
	};

	SearchCtrl.prototype.setupPager = function() {
		this.startPage = this.currentPage - 4;
		this.endPage = this.currentPage + 4;

		if (this.startPage <= 0) {
		    this.endPage -= (this.startPage - 1);
		    this.startPage = 1;
		}

		if (this.endPage > this.pages) {
		    this.endPage = this.pages;
		}
	}

	dynamicSearch.controller('SearchCtrl', SearchCtrl);
}());