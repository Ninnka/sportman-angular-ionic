angular.module('starter.controllers.tab.stadium', [])

  // 场馆页面的控制器
  .controller('StadiumCtrl', ['$scope', 'stateGo', '$rootScope', 'getData', 'api', function ($scope, stateGo, $rootScope, getData, api) {

    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

    $scope.toDetail = function (stadium_id) {
      stateGo.goToState("detail_stadium", {
        type: "stadium",
        id: stadium_id
      });
    };

    $scope.areaList = [
      "",
      "海珠区",
      "天河区",
      "荔湾区",
      "越秀区",
      "番禹区",
      "花都区",
      "萝岗区",
      "白云区",
      "南沙区",
      "黄埔区",
      "增城区",
      "从化区"
    ];
    $scope.areaName = "";

    $scope.typeList = [
      "",
      "篮球",
      "足球",
      "羽毛球",
      "网球",
      "台球",
      "乒乓球",
      "排球",
      "射箭",
      "滑雪",
      "攀登",
      "滑冰"
    ];
    $scope.typeName = "";

    $scope.priceList = [
      "",
      "0",
      "1~49",
      "50~149",
      "150~"
    ];
    $scope.price = "";

    $scope.stadiumList = [];

    $scope.hasFirstLoad = false;
    $scope.getDataPromise = '';

    $scope.getStaidumData = function () {
      $scope.getDataPromise = getData.get(api.stadium_home);
    };
    if (!$scope.hasFirstLoad) {
      $scope.getStaidumData();
    }

    $scope.$on('$ionicView.afterEnter', function () {
      if (!$scope.hasFirstLoad) {
        $scope.hasFirstLoad = true;
        $scope.getDataPromise
          .then(function resolve(res) {
            $scope.stadiumList = $scope.stadiumList.concat(res.data.resultData);
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, function reject(err) {
            console.log("err", err);
          });
      }
    });

    $scope.loadMoreSymbol = true;

    $scope.loadMoreData = function () {
      // $scope.getStaidumData();
      getData.get(api.stadium_home)
        .then(function successCallback(res) {
          $scope.stadiumList = $scope.stadiumList.concat(res.data.resultData);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function errorCallback(err) {
          console.log("err:");
          console.log(err);
        });
    };

    $scope.refreshNewData = function () {
      console.log("refreshNewData");
      $scope.$broadcast('scroll.refreshComplete');
    };

    //   $scope.stadiumList = [
    //     {
    //       name: "胜利运动场（万寿路店）",
    //       post: "img/tabletenis-star.png",
    //       trade: "乒乓球、羽毛球",
    //       opentime: "08:00 - 22:00",
    //       position: "海珠区",
    //       price: 9
    //   },
    //     {
    //       name: "广州市射击射箭运动管理中心",
    //       post: "img/shot-stadium.png",
    //       trade: "台球、射箭、射击",
    //       opentime: "08:00 - 19:00",
    //       position: "天河区",
    //       price: 99
    //   },
    //     {
    //       name: "杰冠真人CS野战基地",
    //       post: "img/cs-stadium.png",
    //       trade: "仿真枪机野战",
    //       opentime: "08:00 - 18:00",
    //       position: "海珠区",
    //       price: 299
    //   },
    //     {
    //       name: "大世界保龄球馆",
    //       post: "img/bowling-stadium.png",
    //       trade: "保龄球",
    //       opentime: "08:00 - 18:00",
    //       position: "海珠区",
    //       price: 199
    //   },
    //     {
    //       name: "冰河湾真冰溜冰场",
    //       post: "img/skip-stadium.png",
    //       trade: "溜冰",
    //       opentime: "08:00 - 22:00",
    //       position: "海珠区",
    //       price: 9
    //   },
    //     {
    //       name: "胜利运动场（万寿路店）",
    //       post: "img/tabletenis-star.png",
    //       trade: "乒乓球、羽毛球",
    //       opentime: "08:00 - 22:00",
    //       position: "海珠区",
    //       price: 9
    //   },
    //     {
    //       name: "广州市射击射箭运动管理中心",
    //       post: "img/shot-stadium.png",
    //       trade: "台球、射箭、射击",
    //       opentime: "08:00-19:00",
    //       position: "天河区",
    //       price: 99
    //   }
    // ];
  }])

  .controller('DetailStadiumCtrl', ['$scope', '$stateParams', 'stateGo', 'getData', 'api', 'UsrInfoLocal', function ($scope, $stateParams, stateGo, getData, api, UsrInfoLocal) {
    $scope.stadium = {};

    $scope.viewTitle = "场馆详情";

    $scope.type = $stateParams.type;
    $scope.id_stadium = $stateParams.id;

    $scope.bookStadium = function (trade_id, trade_name) {
      console.log("bookStadium trade_name:", trade_name);
      stateGo.goToState("detail_stadium_book-list", {
        type: $scope.type,
        name: trade_name,
        id: $scope.stadium.id,
        trade_id: trade_id
      });
    };

    $scope.addStar = function () {
      var starActionApi = '';
      if (!$scope.stadium.stared) {
        starActionApi = api.stadium_addstar;
      } else {
        starActionApi = api.stadium_removestar;
      }
      getData.post(starActionApi, {
          id: UsrInfoLocal.id,
          id_stadium: $scope.id_stadium
        })
        .then(function resolve(res) {
          if (res.data.resultData === '取消收藏成功') {
            $scope.stadium.stared = 0;
          }
          if (res.data.resultData === '收藏成功') {
            $scope.stadium.stared = 1;
          }
          $scope.iconStar = $scope.stadium.stared ? 'img/star-yellow.png' : 'img/star-white.png';
        }, function reject(err) {
          console.log(err);
        });
    };

    $scope.addRecommend = function () {
      var recommendActionApi = '';
      if (!$scope.stadium.recommended) {
        recommendActionApi = api.stadium_addrecommend;
      } else {
        recommendActionApi = api.stadium_removerecommend;
      }
      getData.post(recommendActionApi, {
          id: UsrInfoLocal.id,
          id_stadium: $scope.id_stadium
        })
        .then(function resolve(res) {
          if (res.data.resultData === '取消推荐成功') {
            $scope.stadium.recommended = 0;
          }
          if (res.data.resultData === '推荐成功') {
            $scope.stadium.recommended = 1;
          }
          $scope.iconRecommend = $scope.stadium.recommended ? 'img/recommend-yellow.png' : 'img/recommend-white.png';
        }, function reject(err) {
          console.log(err);
        });
    };

    $scope.getStadiumInfo = function () {
      getData.post(api.stadium_detail, {
          id: UsrInfoLocal.id,
          id_stadium: $scope.id_stadium
        })
        .then(function resolve(res) {
          $scope.stadium = res.data.resultData;
          $scope.iconStar = $scope.stadium.stared ? 'img/star-yellow.png' : 'img/star-white.png';
          $scope.iconRecommend = $scope.stadium.recommended ? 'img/recommend-yellow.png' : 'img/recommend-white.png';
        }, function reject(err) {
          console.log('err:', err);
        });
    };
    $scope.getStadiumInfo();

    // 查看评论
    $scope.viewReview = function () {
      stateGo.goToState('reviews', {
        type: 'stadium',
        id: $scope.stadium.id
      });
    };

  }])

  .controller('BooklistStadiumCtrl', ['$scope', '$stateParams', 'getData', 'api', 'stateGo',function ($scope, $stateParams, getData, api, stateGo) {
    $scope.equipmentList = [];

    $scope.type = $stateParams.type;
    $scope.id = $stateParams.id;
    $scope.trade_id = $stateParams.trade_id;
    $scope.equipmen_type = $stateParams.name;


    $scope.getEquipmentList = function () {
      getData.post(api.stadium_detail_equipment, {
          id: $scope.trade_id
        })
        .then(function resolve(res) {
          console.log('getEquipmentList res', res);
          $scope.equipmentList = res.data.resultData;
        }, function reject(err) {
          console.log("err:", err);
        });
    };
    $scope.getEquipmentList();

    $scope.selectListItem = function (equipment) {
      console.log('equipment', equipment);
      stateGo.goToState('detail_stadium_book-select', {
        info: {
          type: $scope.type,
          stadium_id: $scope.id,
          trade_id: $scope.trade_id,
          equipment_id: equipment.id,
          equipment: equipment
        }
      });
    };

}])

  .controller('BookselectStadiumCtrl', ['$scope', '$stateParams', '$cordovaDialogs', 'UsrInfoLocal', 'stateGo', 'getData', 'api', '$ionicPopup',function ($scope, $stateParams, $cordovaDialogs, UsrInfoLocal, stateGo, getData, api, $ionicPopup) {
    $scope.info = $stateParams.info;
    console.log('$scope.info', $scope.info);

    $scope.selectinfo = {
      selectMount: 1,
      bookstarttime: "",
      bookendtime: ""
    };

    $scope.insSelectMount = function () {
      $scope.selectinfo.selectMount = $scope.selectinfo.selectMount < 5 ? ++$scope.selectinfo.selectMount : 5;
    };

    $scope.decSelectMount = function () {
      $scope.selectinfo.selectMount = $scope.selectinfo.selectMount > 1 ? --$scope.selectinfo.selectMount : 1;
    };

    $scope.openNumberDialog = function () {
      $cordovaDialogs.prompt('输入预定的数量', '数量', ['确认', '取消'], $scope.selectinfo.selectMount)
        .then(function (result) {
          var input = result.input1;
          // no button = 0, 'OK' = 1, 'Cancel' = 2
          var btnIndex = result.buttonIndex;
          alert("input: " + input);
          alert("btnIndex: " + btnIndex);
          var regexp = /[A-Za-z\.]/;
          if (btnIndex == 1 && !regexp.test(input) && Number(input) >= 1 && Number(input) <= 5) {
            $scope.selectinfo.selectMount = Number(input);
          } else {
            alert("数量必须在1-5");
          }
        });
    };

    $scope.submitSelectInfo = function () {
      // 创建订单
      getData.post(api.stadium_createpayment, {
        id: UsrInfoLocal.id,
        id_stadium: $scope.info.stadium_id,
        id_trade: $scope.info.trade_id,
        id_equipment: $scope.info.equipment_id,
        quantity: $scope.selectinfo.selectMount,
        totalprice: 20,
        bookstarttime: '1485930800000',
        bookendtime: '1485136500000'
      }).then(function resolve (res) {
          console.log('submitSelectInfo res', res);
          $scope.showResult(res.data.resultStatus === 'success' ? '预定成功，准备付款' : '预定失败');
          if(res.data.resultStatus === 'success') {
            stateGo.goToState("prepare-pay", {
              // id: $scope.id,
              // type: $scope.type,
              info: {
                type: 'stadium',
                id_payment: res.data.resultData.id_payment,
                id_activity: 0,
                id_stadium: res.data.resultData.id_stadium,
                payTotalPrice: $scope.selectinfo.selectMount * $scope.info.equipment.price,
                redirectState: 'detail_stadium'
              }
            });
          }
        }, function reject (err) {
          $scope.showResult('网络出错，请稍后重试');
          console.log('submitSelectInfo err', err);
        });
    };

    $scope.showResult = function (result) {
      var alertPopup = $ionicPopup.alert({
        title: result,
        template: ''
      });
      alertPopup.then(function (res) {});
    };
}]);
