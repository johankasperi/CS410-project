(function() {
	'use strict';
	var SearchCtrl = function(restService, $location, $routeParams) {
		this.location = $location;
		this.routeParams = $routeParams;
		this.params = this.routeParams;

		this.restService = restService;
		this.results = [];

		this.currentPage = 0;
		this.pages = 0;
		this.pagination = [];

		this.loading = false;

		this.showInfoBox = false;
		this.info = {
			filters: [],
			similarity: {},
			query_type: {}
		};
		this.searchError = false;

		this.search(false);
	};

	SearchCtrl.prototype.search = function(newQuery) {
		if(newQuery) {
			this.params.page = 1;
		};
		this.location.search(this.params);
		this.loading = true;
		this.showInfoBox = false;

		var self = this;
		this.restService.search(this.params, function(err, result) {
			if(err) {
				self.searchError = true;
				return;
			}
			else {
				self.currentPage = parseInt(result.page);
				self.pages = parseInt(result.pages);
				self.getPagination();

				self.results = result.results;
				self.termVector = result.term_vector;

				self.buildInfoBox();
				self.showInfoBox = true;
				self.loading = false;
				self.searchError = false;
			}
		});
	};

	SearchCtrl.prototype.buildInfoBox = function() {
		this.info = {
			query: "",
			filters: [],
			similarity: [],
			query_type: [],
			score: 0
		};
		this.info.query = this.params.search_query;
		if(this.params.stem == 1) {
			this.info.filters.push({
				name: "Stemming",
				source: "#/learn/1"
			})
		}
		if(this.params.stop == 1) {
			this.info.filters.push({
				name: "Stop word",
				source: "#/learn/2"
			})
		}
		if(this.params.lowercase == 1) {
			this.info.filters.push({
				name: "Lowercase",
				source: "#/learn/3"
			})
		}
		if(this.params.similarity === "BM25") {
			this.info.similarity = {
				name: "BM25",
				source: "#/learn/4"
			}
		}
		else if(this.params.similarity === "LMD") {
			this.info.similarity = {
				name: "LMDirichlet",
				source: "#/learn/5"
			}
		}
		if(this.params.query_type == 1) {
			this.info.query_type = {
				name: "Match",
				source: "#/learn/6"
			}
		}
		else if(this.params.query_type == 2) {
			this.info.query_type = {
				name: "More like this",
				source: "#/learn/7"
			}
		}
		else if(this.params.query_type == 3) {
			this.info.query_type = {
				name: "Common",
				source: "#/learn/8"
			}
		}
	}

	SearchCtrl.prototype.fixUrl = function(url) {
		if(url.startsWith('http://')) {
			return url;
		}
		else {
			return "http://"+url;
		}
	}

	SearchCtrl.prototype.getPagination = function() {
		this.pagination = [];
		var first = this.currentPage - 4;
		var last = this.currentPage + 4;
		if(first < 1) {
			var newLast = (first*-1) + parseInt(this.currentPage) + 5;
			last = newLast < this.pages ? newLast : this.pages;
			first = 1;
		}
		if(last > this.pages) {
			var newFirst = this.pages-8;
			first = newFirst > 1 ? newFirst : 1;
			last = this.pages;
		};

		this.pagination = [];
		for(var i = first; i <= last; i++) {
			this.pagination.push(i);
		}
	}

	SearchCtrl.prototype.paginate = function(page) {
		this.params.page = page;
		this.location.search(this.params);
	}

	dynamicSearch.controller('SearchCtrl', SearchCtrl);
}());