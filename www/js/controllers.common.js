angular.module('starter.controllers.common', [])

/**
 * ------------------------------------------------------------------------------------------------
 * 通用部分
 */
.controller('ionNavButtonsGoCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', function ($scope, $rootScope, $state, $ionicHistory) {
  $scope.toBackView = function () {
    console.log("back in ionNavButtonsGoCtrl");
    if ($scope.target === undefined || $scope.target === "") {
      $ionicHistory.goBack(-1);
    } else {
      $state.go($scope.target);
    }
    $rootScope.outAnimation();
  };
}])

.controller('citySelectionCtrl', ['$scope', function ($scope) {
  $scope.currentCity = "广州";
}])

.controller('searchActivityCtrl', ['$scope', function ($scope) {
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

.controller('searchStadiumCtrl', ['$scope', function ($scope) {
  $scope.hotSearch = [
    '运动场',
    '运动场',
    '运动场',
    '运动场',
    '运动场',
    '运动场',
    '运动场'
  ];

  $scope.historySearch = [
    '运动场',
    '运动场',
    '运动场',
    '运动场'
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

}])

.controller('reviewsCtrl', ['$scope', function ($scope) {

  $scope.totalScore = 3.5;

  $scope.featuresList = [
    "场地干净 206",
    "服务态度好 183",
    "环境不错 98",
    "位置好找 78",
    "交通方便 72",
    "停车方便 53",
    "场地新 43",
    "性价比高 43",
    "停车方便 53"
  ];

  $scope.reviewsList = [
    {
      username: "ninnka",
      useravatar: "http://i1.hdslb.com/bfs/face/96c4fbb4a280366cc4f431038be004abd7ca983b.jpg@75Q.webp",
      userreview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolorin reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      usermark: 2.5,
      timestamp: 1484364348144
    },
    {
      username: "ninnka",
      useravatar: "http://i1.hdslb.com/bfs/face/96c4fbb4a280366cc4f431038be004abd7ca983b.jpg@75Q.webp",
      userreview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolorin reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      usermark: 2.5,
      timestamp: 1484364348144
    }
  ];
}]);
