(function() {
	'use strict';
	var LearnCtrl = function(restService, $routeParams, $sce) {
		this.restService = restService;
		this.routeParams = $routeParams;
		this.sce = $sce;

		this.data = {};

		this.getResource(this.routeParams.id);
	};

	LearnCtrl.prototype.getResource = function(id) {
		var self = this;
		this.restService.getResource(id, function(err, data) {
			self.data = data;
		})
	};

	LearnCtrl.prototype.bindHtml = function(string) {
		return this.sce.trustAsHtml(string);
	}

	dynamicSearch.controller('LearnCtrl', LearnCtrl);
}());