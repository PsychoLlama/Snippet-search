/*globals angular*/
(function () {
  'use strict';
  angular.module('app', [])
    .directive('navbar', function () {
      return {
        restrict: 'E',
        templateUrl: '/assets/directives/navbar.html'
      };
    });
}());
