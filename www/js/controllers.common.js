angular.module('starter.controllers.common', [])

  /**
   * ------------------------------------------------------------------------------------------------
   * 通用部分
   */
  .controller('ionNavButtonsGoCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', function ($scope, $rootScope, $state, $ionicHistory) {
    $scope.toBackView = function () {
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

  .controller('searchActivityCtrl', ['$scope', 'getData', 'api', function ($scope, getData, api) {
    $scope.searchInfo = {
      key: ""
    };
    $scope.activityList = [];

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

    $scope.clearHistorySearch = function () {
      $scope.historySearch = [];
    };

    $scope.search = function () {
      if ($scope.searchInfo.key !== "") {
        getData.get(api.search_activity, {
            name: $scope.searchInfo.key
          })
          .then(function resolve(res) {
            console.log("res.data:", res.data);
            $scope.activityList = res.data.resultData;
          }, function reject(err) {
            console.log("err:", err);
          });
      } else {
        alert('搜索内容不能为空');
      }
    };
  }])

  .controller('searchStadiumCtrl', ['$scope', 'getData', 'api', function ($scope, getData, api) {
    $scope.searchInfo = {
      key: ""
    };
    $scope.stadiumList = [];

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

    $scope.clearHistorySearch = function () {
      $scope.historySearch = [];
    };

    $scope.search = function () {
      if ($scope.searchInfo.key !== "") {
        getData.get(api.search_stadium, {
            name: $scope.searchInfo.key
          })
          .then(function resolve(res) {
            console.log("res.data:", res.data);
            $scope.stadiumList = res.data.resultData;
          }, function reject(err) {
            console.log("err:", err);
          });
      } else {
        alert('搜索内容不能为空');
      }
    };

  }])

  .controller('reviewCtrl', ['$scope', '$rootScope', '$stateParams', function ($scope, $rootScope, $stateParams) {
    console.log("in review");
    console.log("id_user", $stateParams.id_user);
    console.log("id_activity", $stateParams.id_activity);
    $scope.reviewInfo = {
      id_user: $stateParams.id_user,
      id_activity: $stateParams.id_activity,
      review: '',
      score: 0
    };
  }])

  .controller('preparePayCtrl', ['$scope', '$stateParams', 'stateGo', 'getData', 'api', '$ionicPopup', '$ionicLoading', function ($scope, $stateParams, stateGo, getData, api, $ionicPopup, $ionicLoading) {

    $scope.payinfo = {
      id: $stateParams.id,
      type: $stateParams.type
    };

    $scope.pay = function () {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      let payUrl = $scope.payinfo.type === 'activity' ? api.activity_pay : api.stadium_pay;
      getData.post(payUrl, {
        id: $scope.payinfo.id
      }).then(function resolve(res) {
        $ionicLoading.hide();
        $scope.showResult(res.data.resultStatus === 'success' ? '支付成功' : '支付失败');
        stateGo.goToBack({
          step: -1
        });
      }, function reject(err) {
        $scope.showResult('支付失败', '发生网络错误');
        stateGo.goToBack({
          step: -1
        });
      });
    };

    $scope.showResult = function (result, reason) {
      var alertPopup = $ionicPopup.alert({
        title: result,
        template: reason
      });
      alertPopup.then(function (res) {});
    };
  }])

  .controller('reviewsCtrl', ['$scope', '$stateParams', 'getData', 'api', function ($scope, $stateParams, getData, api) {

    $scope.id = $stateParams.id;
    $scope.type = $stateParams.type;

    $scope.totalscore = 0;
    $scope.featureList = [];
    $scope.reviewList = [];

    $scope.getReviewData = function () {
      let apiUrl = $scope.type === 'activity' ? api.activity_reviewlist : api.stadium_reviewlist;
      getData.get(api.activity_reviewlist, {
        id_activity: $scope.id
      }).then(function resolve(res) {
        console.log('res:', res);
        $scope.featureList = res.data.resultData.featureList;
        $scope.reviewList = res.data.resultData.reviewList;
        let totalscore = res.data.resultData.totalscore;
        let bol = totalscore.match('.');
        if (bol) {
          $scope.totalscore = Math.floor(totalscore) + 0.5;
        } else {
          $scope.totalscore = totalscore;
        }
      }, function reject(err) {
        console.log('err:', err);
      });
    };
    $scope.getReviewData();

  }]);
