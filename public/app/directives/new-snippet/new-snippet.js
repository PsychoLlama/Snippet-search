/*globals angular, console */
angular.module('App')
  .directive('newSnippet', function () {
    'use strict';
    return {
      restrict: 'E',
      templateUrl: '/app/directives/new-snippet/new-snippet.html'
    };
  })
  .controller('NewSnippetController', ['$scope', '$http', function ($scope, $http) {
    'use strict';

    $scope.snippet = {
      title: null,
      codesnippet: null,
      description: null
    };

    $scope.add = function (snippet) {

      $http.post('/codeentered', snippet)
        .then(function (res) {
          console.log(res.data);
        });
    };
  }]);
