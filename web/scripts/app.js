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
      controller: 'SearchCtrl as search',
    })
    .when('/learn/:id', {
      templateUrl: 'views/learn.html',
      controller: 'LearnCtrl as learn'
    })
    .otherwise({
      redirectTo: '/'
    });
});

dynamicSearch.directive('back', ['$window', function($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $window.history.back();
            });
        }
    };
}]);

dynamicSearch.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});
