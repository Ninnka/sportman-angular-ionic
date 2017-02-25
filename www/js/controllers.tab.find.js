angular.module('starter.controllers.tab.find', [])

  .controller('FindCtrl', ["$scope", '$rootScope', "$http", "constantParams", "valueParams", "provideTest", "getData", "studentsService", "$timeout", function ($scope, $rootScope, $http, constantParams, valueParams, provideTest, getData, studentsService, $timeout) {

    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

}]);
