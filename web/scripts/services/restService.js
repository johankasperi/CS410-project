(function() {
  'use strict';
  var restService = function($http) {
    this.http = $http;
    this.baseUrl = "http://localhost:3000/";
    this.params = {
      search_query: "blackhawks",
      stem: true,
      stop: false,
      lowercase: false,
      similarity: "BM25",
      query_type: 1
    };

  };

  var buildParams = function() {
    var params = { search_query}
  }

  restService.prototype.getParams = function() {
    return this.params;
  }

  restService.prototype.setParams = function(params) {
    this.params = params;
  }

  restService.prototype.search = function(callback) {
    this.http.get('/query/', { params: this.params }).
      error(function(data, status) {
        return callback(null, data);
      }).
      success(function(data, status) {
        return callback(null, data);
      });
  };

  dynamicSearch.service('restService', restService);
}());