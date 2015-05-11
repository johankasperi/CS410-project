(function() {
  'use strict';
  var restService = function($http) {
    this.http = $http;
    this.baseUrl = "http://localhost:3000/";
    this.defaultParams = {
      search_query: "",
      page: 1,
      stem: 1,
      stop: 0,
      lowercase: 0,
      similarity: "BM25",
      query_type: 1,
      titleboost: 1,
      bodyboost: 1,
      percentage_must: 0.3,
      cutoff_frequency: 0.001
    };

  };

  restService.prototype.getDefaultParams = function() {
    return this.defaultParams;
  }

  restService.prototype.search = function(p, callback) {
    this.http.get('/query/', { params: p }).
      error(function(data, status) {
        return callback(true, null);
      }).
      success(function(data, status) {
        console.log(data);
        return callback(null, data);
      });
  };

  restService.prototype.getResource = function(id, callback) {
    this.http.get('/resource/'+id, {}).
      error(function(data, status) {
        return callback(true, null);
      }).
      success(function(data, status) {
        return callback(null, data);
      });
  }

  dynamicSearch.service('restService', restService);
}());