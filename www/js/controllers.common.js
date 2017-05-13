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

  .controller('reviewCtrl', ['$scope', '$rootScope', '$stateParams', 'getData', 'api', '$ionicPopup', 'stateGo', function ($scope, $rootScope, $stateParams, getData, api, $ionicPopup, stateGo) {

    $scope.featureList = [];
    $scope.newFeatureList = [];
    $scope.agreeFeatureList = [];

    $scope.reviewInfo = {
      id_user: $stateParams.id_user,
      id_item: $stateParams.id_item,
      id_type: $stateParams.id_type,
      review: '',
      score: 5,
      agreefeature: $scope.agreeFeatureList,
      addedfeature: $scope.newFeatureList
    };

    $scope.getFeature = function () {
      let symbolUrl = $scope.reviewInfo.id_type === 'activity' ? api.activity_getfeature : api.stadium_getfeature;
      getData.post(symbolUrl, {
          id: $scope.reviewInfo.id_item
        })
        .then(function resolve(res) {
          $scope.featureList = res.data.resultData;
        }, function reject(err) {
          console.log('err:', err);
        });
    };
    $scope.getFeature();

    $scope.addFeature = function () {
      let nf = {
        feature: ''
      };
      $scope.newFeatureList.push(nf);
    };

    $scope.deleteFeature = function (i) {
      $scope.newFeatureList.splice(i, 1);
    };

    $scope.agreeFeature = function (id) {
      let index = $scope.agreeFeatureList.indexOf(id);
      if (index === -1) {
        $scope.agreeFeatureList.push(id);
      } else {
        $scope.agreeFeatureList.splice(index, 1);
      }
    };

    $scope.isAgree = function (id) {
      let index = $scope.agreeFeatureList.indexOf(id);
      if (index === -1) {
        return false;
      }
      return true;
    };

    $scope.submitReview = function () {
      if ($scope.reviewInfo.review.length < 16) {
        $scope.showPop('发表失败', '评论字数不足');
        return false;
      }
      let reviewUrl = $scope.reviewInfo.id_type === 'activity' ? api.activity_addreview : api.stadium_addreview;
      getData.post(reviewUrl, $scope.reviewInfo)
        .then(function resolve(res) {
          $scope.showPop('', res.data.resultData);
          if (res.data.resultStatus === 'success') {
            stateGo.goToBack({
              step: -1
            });
          }
        }, function reject(err) {
          $scope.showPop('发表失败', '发生未知的网络错误');
          console.log('err:', err);
        });
    };

    $scope.showPop = function (result, reason) {
      var alertPopup = $ionicPopup.alert({
        title: result,
        template: reason
      });
      alertPopup.then(function (res) {});
    };

  }])

  .controller('preparePayCtrl', ['$scope', '$stateParams', 'stateGo', 'getData', 'api', '$ionicPopup', '$ionicLoading', function ($scope, $stateParams, stateGo, getData, api, $ionicPopup, $ionicLoading) {

    $scope.payinfo = $stateParams.info;
    console.log('payinfo', $scope.payinfo);

    $scope.selectPayIndex = 0;

    $scope.selectPay = function (i) {
      $scope.selectPayIndex = i;
    };

    $scope.paymentItem = {};
    $scope.paymentInfo = {
      payTotalPrice: $stateParams.info.payTotalPrice,
    };

    $scope.getPaymentInfo = function () {
      let paymentUrl = $scope.payinfo.type === 'activity' ? api.activity_getpayment : api.stadium_getpayment;
      getData.post(paymentUrl, {
          id: $scope.payinfo.id_payment
        })
        .then(function resolve(res) {
          console.log('res', res);
          $scope.paymentItem = res.data.resultData;
        }, function reject(err) {
          console.log('err:', err);
        });
    };
    $scope.getPaymentInfo();

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
          id: $scope.payinfo.id_payment
        })
        .then(function resolve(res) {
          $ionicLoading.hide();
          $scope.showResult(res.data.resultStatus === 'success' ? '支付成功' : '支付失败');
          if($scope.payinfo.redirectState == 'detail_stadium') {
            stateGo.goToBack({
              step: -4
            });
          }else if ($scope.payinfo.redirectState == 'detail_activity') {
            stateGo.goToState('detail_activity', {
              id_activity: $scope.payinfo.id_activity,
              type: 'activity'
            }, "back");
          }else {
            stateGo.goToBack({
              step: -1
            });
          }
        }, function reject(err) {
          $ionicLoading.hide();
          $scope.showResult('支付失败', '发生网络错误');
          // if($scope.payinfo.redirectState != undefined || $scope.payinfo.redirectState != '') {
          //   stateGo.goToBack({
          //     step: -1
          //   });
          // }else {
          //   stateGo.goToBack({
          //     step: -1
          //   });
          // }
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

  .controller('reviewBtnCtrl', ['$scope', 'stateGo', function ($scope, stateGo) {

    $scope.review = function (id_user, id_item, id_type) {
      console.log("go to review");
      stateGo.goToState('review', {
        id_user: id_user,
        id_item: id_item,
        id_type: id_type
      });
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
        })
        .then(function resolve(res) {
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
