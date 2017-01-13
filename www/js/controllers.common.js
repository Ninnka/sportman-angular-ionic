angular.module('starter.controllers.common', [])

/**
 * ------------------------------------------------------------------------------------------------
 * 通用部分
 */

.controller('searchCtrl', ['$scope', function ($scope) {
  $scope.hotSearch = [
    '彩色跑',
    '荧光跑',
    '野外枪战',
    '乒乓球',
    '羽毛球',
    '白云山射击场',
    '胜利体育馆'
  ];

  $scope.historySearch = [
    '彩色跑',
    '胜利体育馆',
    '野外枪战',
    '荧光跑'
  ];

  $scope.hasHistorySearch = $scope.historySearch.length > 0;

  $scope.clearHistorySearch = function () {

  };
}])

.controller('reviewCtrl', ['$scope', '$rootScope', '$stateParams', function ($scope, $rootScope, $stateParams) {
  console.log("in review");
  console.log("type", $stateParams.type);
  console.log("id", $stateParams.id);
  $scope.reviewinfo = {
    type: $stateParams.type,
    id: $stateParams.id
  };
}])

.controller('preparePayCtrl', ['$scope', function ($scope) {

}]);
