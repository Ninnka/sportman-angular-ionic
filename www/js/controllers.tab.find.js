angular.module('starter.controllers.tab.find', [])

  .controller('FindCtrl', ["$scope", '$rootScope', "$http", 'getData', 'api', 'stateGo', function ($scope, $rootScope, $http, getData, api, stateGo) {

    // test
    $scope.isLike = false;

    $scope.socialcircleList = [];

    $scope.getSocialCircleList = function () {
      // todo
    };
    $scope.getSocialCircleList();

    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

    $scope.toggleLike = function ($event, id) {
      // todo
      console.log($event);
      if ($event.stopPropagation) {
        $event.stopPropagation();
      }
      $scope.isLike = !$scope.isLike;
    };

    $scope.viewDetail = function ($event, id) {
      // todo
      if ($event.stopPropagation) {
        $event.stopPropagation();
      }
      stateGo.goToState('socialcircle-detail', {
        id: id
      });
    };

  }])

  .controller('SocialcircleDetailCtrl', ['$scope', '$stateParams', 'getData', 'api', function ($scope, $stateParams, getData, api) {

    $scope.socialMsgId = $stateParams.id;

    $scope.getSocialMsg = function () {
      // todo
    };
    $scope.getSocialMsg();

  }])

  .controller('ScocialcircleMyCtrl', ['$scope', 'getData', 'api', function ($scope, getData, api) {

    $scope.getSocialMsg = function () {
      // todo
    };
    $scope.getSocialMsg();

  }]);
