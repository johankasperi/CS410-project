'use strict';

var dynamicSearch = angular.module('dynamicSearch', ['ngRoute']);

dynamicSearch.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/start.html',
      controller: 'StartCtrl as start'
    })
    .when('/search', {
      templateUrl: 'views/search.html',
      controller: 'SearchCtrl as search'
    })
    .when('/learn', {
      templateUrl: 'views/learn.html',
      controller: 'LearnCtrl as learn'
    })
    .otherwise({
      redirectTo: '/'
    });
});
