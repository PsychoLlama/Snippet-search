/*globals angular, console */
angular.module('App')
  .directive('search', function () {
    'use strict';
    return {
      restrict: 'E',
      templateUrl: '/app/directives/search/search.html'
    };
  })
  .controller('SearchController', ['$scope', '$http', function ($scope, $http) {
    'use strict';
    $scope.send = function (query) {
      $http.post('/search', $scope.search)
        .then(function (res) {
          console.log(res.data);
        });
    };
  }]);
