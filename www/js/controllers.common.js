angular.module('starter.controllers.common', [])

  /**
   * ------------------------------------------------------------------------------------------------
   * 通用部分
   */
  .controller('ionNavButtonsGoCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', function ($scope, $rootScope, $state, $ionicHistory) {
    $scope.toBackView = function () {
      console.log("back in ionNavButtonsGoCtrl");
      if ($scope.target === undefined || $scope.target === '') {
        $ionicHistory.goBack(-1);
      } else {
        $state.go($scope.target);
      }
      $rootScope.outAnimation();
    };
}])

  .controller('citySelectionCtrl', ['$scope', '$document', '$ionicScrollDelegate', '$location', '$timeout', function ($scope, $document, $ionicScrollDelegate, $location, $timeout) {
    $scope.currentCity = '广州';
    $scope.currentHash = '';
    $scope.showhint = false;

    $scope.searchinfo = {
      searchKey: ''
    };

    var lis = $document.find('#city-selector li');
    var scroller = $ionicScrollDelegate.$getByHandle('city-scroller');

    var timer;

    $scope.onDrag = function ($event) {
      // clearTimeout(timer);
      // timer = $timeout(function () {
      //   $scope.showhint = false;
      // }, 1500);
      $scope.showhint = true;
      $scope.dy = $event.gesture.touches[0].clientY;
      for (var i = 0; i < lis.length; i++) {
        if ($scope.dy > lis[i].offsetTop && $scope.dy <= lis[i].offsetTop + lis.eq(i)
          .outerHeight()) {
          var targetHash = $scope.currentHash = String.fromCharCode(65 + i);
          $location.hash(targetHash);
          scroller.anchorScroll();
          break;
        }
      }
    };

    $scope.onRelease = function () {
      $scope.showhint = false;
    };

    $scope.onTap = function ($event) {
      $scope.dy = $event.gesture.touches[0].clientY;
      for (var i = 0; i < lis.length; i++) {
        if ($scope.dy > lis[i].offsetTop && $scope.dy <= lis[i].offsetTop + lis.eq(i)
          .outerHeight()) {
          var targetHash = $scope.currentHash = String.fromCharCode(65 + i);
          $location.hash(targetHash);
          scroller.anchorScroll();
          break;
        }
      }
    };
  }])

  .controller('searchActivityCtrl', ['$scope', function ($scope) {
    $scope.key = "";

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

    $scope.activityList = [
      {
        name: "白云山野战场畅玩",
        position: "海珠区",
        post: "img/marason-star.png",
        host: "广州体育委员会",
        currentnumber: 11,
        totalnumber: 30,
        price: 99,
        starttime: "1484396287893"
    },
      {
        name: "广州马拉松",
        position: "白云区",
        post: "img/shot-star.png",
        host: "白云山野战场",
        currentnumber: 11,
        totalnumber: 30,
        price: 199,
        starttime: "1484396287893"
    },
      {
        name: "轮滑逛街活动",
        position: "白云区",
        post: "img/skip-star.png",
        host: "阿迪王专业体育用具",
        currentnumber: 11,
        totalnumber: 30,
        price: 199,
        starttime: "1484396287893"
    },
      {
        name: "荧光夜跑——地",
        position: "白云区",
        post: "img/tabletenis-star.png",
        host: "阿迪王专业体育用具",
        currentnumber: 11,
        totalnumber: 30,
        price: 199,
        starttime: "1484396287893"
      }
    ];
  }])

  .controller('searchStadiumCtrl', ['$scope', function ($scope) {
    $scope.key = "";

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

    $scope.stadiumList = [
      {
        stadiumname: "胜利运动场（万寿路店）",
        stadiumpost: "img/tabletenis-star.png",
        stadiumtrade: "乒乓球、羽毛球",
        stadiumopentime: "08:00-22:00",
        stadiumposition: "海珠区",
        stadiumprice: 9
    },
      {
        stadiumname: "广州市射击射箭运动管理中心",
        stadiumpost: "img/shot-stadium.png",
        stadiumtrade: "台球、射箭、射击",
        stadiumopentime: "08:00-19:00",
        stadiumposition: "天河区",
        stadiumprice: 99
    },
      {
        stadiumname: "杰冠真人CS野战基地",
        stadiumpost: "img/cs-stadium.png",
        stadiumtrade: "仿真枪机野战",
        stadiumopentime: "08:00-18:00",
        stadiumposition: "海珠区",
        stadiumprice: 299
    },
      {
        stadiumname: "大世界保龄球馆",
        stadiumpost: "img/bowling-stadium.png",
        stadiumtrade: "仿真枪机野战",
        stadiumopentime: "08:00-18:00",
        stadiumposition: "海珠区",
        stadiumprice: 199
    },
      {
        stadiumname: "冰河湾真冰溜冰场",
        stadiumpost: "img/skip-stadium.png",
        stadiumtrade: "乒乓球、羽毛球",
        stadiumopentime: "08:00-22:00",
        stadiumposition: "海珠区",
        stadiumprice: 9
      }
    ];
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

  .controller('preparePayCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

    $scope.payinfo = {
      type: $stateParams.type,
      id: $stateParams.id,
      selectMount: $stateParams.selectMount,
      unitprice: $stateParams.unitprice
    };

    console.log("type:", $scope.payinfo.type);
    console.log("id:", $scope.payinfo.id);
    console.log("selectMount:", $scope.payinfo.selectMount);
    console.log("unitprice:", $scope.payinfo.unitprice);

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
