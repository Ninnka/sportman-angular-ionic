angular.module('starter.controllers.tab.activity', [])

  .controller('AppCtrl', ['$scope', '$rootScope', '$state', 'SignInOrUpFac', 'ls', '$ionicHistory', 'UsrInfoLocal', 'Logout', '$ionicViewSwitcher', '$cordovaBarcodeScanner', '$document', '$window', '$cordovaGeolocation', function ($scope, $rootScope, $state, SignInOrUpFac, ls, $ionicHistory, UsrInfoLocal, Logout, $ionicViewSwitcher, $cordovaBarcodeScanner, $document, $window, $cordovaGeolocation) {

    // 监听地理位置
    $scope.watchPosition = function () {
      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false
      };
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          alert("lat: " + lat);
          alert("long: " + long);
        }, function (err) {
          // error
          console.log("err:", err);
        });


      // var watchOptions = {
      //   timeout: 3000,
      //   enableHighAccuracy: false
      // };
      //
      // var watch = $cordovaGeolocation.watchPosition(watchOptions);
      // watch.then(
      //   null,
      //   function (err) {
      //     // error
      //   },
      //   function (position) {
      //     var lat = position.coords.latitude;
      //     var long = position.coords.longitude;
      //     alert("lat: "+lat);
      //     alert("long: "+long);
      //   });


      // watch.clearWatch();
      // // OR
      // $cordovaGeolocation.clearWatch(watch)
      //   .then(function (result) {
      //     // success
      //   }, function (error) {
      //     // error
      //   });
    };
    $scope.watchPosition();

    // 打开电话应用
    $scope.openTel = function () {

    };

    // 设置rem
    var winX = $document[0].body.clientWidth;
    var html = $document.find("html");
    html[0].style["font-size"] = winX / 640 * 100 + "px";

    $window.onresize = function () {
      var winX = $document[0].body.clientWidth;
      var html = $document.find("html");
      html[0].style["font-size"] = winX / 640 * 100 + "px";
    };

    // 打开定位
    $rootScope.openLocate = function () {
      $state.go("city-selection");
      $rootScope.inAnimation();
    };

    // 打开相机扫码
    $rootScope.openScanCamara = function () {
      $cordovaBarcodeScanner.scan()
        .then(function (barcodeData) {
          // Success! Barcode data is here
          // return info:
          // 1.text
          // 2.format
          // 3.cancelled
          for (var key in barcodeData) {
            alert("key: " + key + "  value: " + barcodeData[key]);
          }
        }, function (error) {
          // An error occurred
          alert(error);
        });
    };

    $rootScope.preparePay = function (targetType, targetId, targetPay) {
      $state.go("prepare-pay");
      $rootScope.inAnimation();
    };

    $rootScope.pay = function () {
      console.log("pay");
    };

    $rootScope.clearHistory = function () {
      $ionicHistory.clearHistory();
    };

    $rootScope.checkSignSymbolAndState = function (targetState) {
      // $state.go(targetState);
      // $rootScope.inAnimation();
      if ($rootScope.globalSignSymbol === true) {
        $state.go(targetState);
        $rootScope.inAnimation();
      } else {
        console.log("请先登录");
      }
    };

    $rootScope.inAnimation = function () {
      $ionicViewSwitcher.nextDirection("forward");
    };

    $rootScope.outAnimation = function () {
      $ionicViewSwitcher.nextDirection("back");
    };

    $rootScope.toBackView = function (target) {
      console.log("back");
      if (target === undefined) {
        $ionicHistory.goBack(-1);
      } else {
        $state.go(target);
      }
      $rootScope.outAnimation();
    };

    $rootScope.logout = function () {
      // UsrInfoLocal.clear();
      // ls.clear();
      Logout.logoutCurrentAccount();
      $rootScope.globalSignSymbol = false;
      $rootScope.toBackView();
    };

    $scope.uil = UsrInfoLocal;

    $rootScope.globalSignSymbol = false;
    $scope.globalUsrname = ls.get("usrname", "");
    $scope.globalPassword = ls.get("usrpassword", "");

    if ($scope.globalUsrname !== "" && $scope.globalPassword !== "") {
      SignInOrUpFac.signIn($scope.globalUsrname, $scope.globalPassword)
        .then(function resolve(response) {
          // console.log("global sign in");
          // console.log("response", response);
          if (response.data.resultStatus === "success") {
            // console.log("success");
            $rootScope.globalSignSymbol = true;

            $scope.uil.setid(response.data.resultData[0].id);
            $scope.uil.setUm(response.data.resultData[0].name);
            $scope.uil.setSpmid(response.data.resultData[0].sportmanid);
            $scope.uil.setAvatar(response.data.resultData[0].avatar);
            $scope.uil.setEmpty(false);

            $scope.uil.setEmail(response.data.resultData[0].email);
            $scope.uil.setPn(response.data.resultData[0].password);
            $scope.uil.setGender(response.data.resultData[0].gender);

            // console.log("UsrInfoLocal.sportmanid: " + UsrInfoLocal.sportmanid);

            ls.set("id", response.data.resultData[0].id);
            ls.set("usrpassword", response.data.resultData[0].password);
            ls.set("usrname", response.data.resultData[0].name);
            ls.set("avatar", response.data.resultData[0].avatar);
            ls.set("sportmanid", response.data.resultData[0].sportmanid);

            ls.set("email", response.data.resultData[0].email);
            ls.set("phonenumber", response.data.resultData[0].mobile);
            ls.set("gender", response.data.resultData[0].gender);

          } else {
            console.log("global fail");
          }
        });
    }
  }])

  // 主页控制器
  .controller('ActivityCtrl', ['$scope', '$rootScope', 'getData', 'api', '$ionicSlideBoxDelegate', 'stateGo', 'UsrInfoLocal', '$ionicScrollDelegate', function ($scope, $rootScope, getData, api, $ionicSlideBoxDelegate, stateGo, UsrInfoLocal, $ionicScrollDelegate) {

    // $scope.$on("$ionicView.enter", function () {
    //   $rootScope.clearHistory();
    // });

    $scope.firstEnter = true;
    $scope.activityList = [];
    $scope.bannerList = [];

    $scope.loadMoreSymbol = true;

    var scroller = $ionicScrollDelegate.$getByHandle('activity_home-scroller');

    $scope.moreDataCanbeLoaded = function () {
      // todo
      return true;
    };

    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
      if (!$scope.firstEnter) {
        $ionicSlideBoxDelegate.start();
      }
    });

    $scope.getActivityData = function () {
      getData.get(api.activity_home)
        .then(function successCallback(res) {
          console.log(res);
          $scope.bannerList = res.data.resultData.bannerList;
          $scope.activityList = $scope.activityList.concat(res.data.resultData.activityList);
          // scroller.resize();
          $ionicSlideBoxDelegate.update();
        }, function errorCallback(err) {
          console.log("err:");
          console.log(err);
        });
    };
    $scope.getActivityData();
    $scope.firstEnter = false;

    $scope.toDetail = function (id_activity) {
      stateGo.goToState('detail_activity', {
        type: "activity",
        id_activity: id_activity
      });
    };

    $scope.loadMoreData = function () {
      console.log("loadMoreData");
      getData.get(api.activity_home)
        .then(function successCallback(res) {
          // console.log(res);
          $scope.activityList = $scope.activityList.concat(res.data.resultData.activityList);
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

  }])

  // 主页商品详细页面控制器
  .controller('DetailActivityCtrl', ['$scope', '$rootScope', '$stateParams', 'getData', 'stateGo', 'api', 'UsrInfoLocal', function ($scope, $rootScope, $stateParams, getData, stateGo, api, UsrInfoLocal) {

    $scope.viewTitle = "活动详细";
    $scope.id_activity = $stateParams.id_activity;
    $scope.type = $stateParams.type;

    $scope.activity = {};

    $scope.getActivityInfo = function () {
      getData.post(api.activity_detail, {
          id: UsrInfoLocal.id,
          id_activity: $scope.id_activity
        })
        .then(function resolve(res) {
          console.log("res.data:", res.data);
          $scope.activity = res.data.resultData;
        }, function reject(err) {
          console.log("err:", err);
        });
    };
    $scope.getActivityInfo();

    // 参加活动
    $scope.attendActivity = function () {
      // todo
      stateGo.goToState('registration-instruction', {
        id_activity: $scope.id_activity,
        type: $scope.type
      });
    };

    // 退出活动
    $scope.exitActivity = function () {
      // todo
    };

    // 添加点赞
    $scope.addStar = function () {
      // todo
    };

    // 添加推荐
    $scope.addRecommend = function () {
      // todo
    };
  }])

  // 报名参加活动
  .controller('RegistrationInstructionCtrl', ['$scope', '$stateParams', 'stateGo', function ($scope, $stateParams, stateGo) {

    $scope.id_activity = $stateParams.id_activity;
    $scope.type = $stateParams.type;

    $scope.isAgree = false;

    $scope.agreeTreaty = function () {
      // todo
      if ($scope.isAgree) {
        stateGo.goToState("registration-information", {
          id_activity: $scope.id_activity,
          type: $scope.type
        });
      } else {
        alert("请阅读并同意协议后才能进行下一步操作");
      }
    };
  }])

  .controller('RegistrationInformationCtrl', ['$scope', '$stateParams', 'stateGo', function ($scope, $stateParams, stateGo) {

    $scope.id_activity = $stateParams.id_activity;
    $scope.type = $stateParams.type;

    $scope.information = {
      // todo
    };

    $scope.submitInformation = function () {
      // todo
      stateGo.goToState("registration-complete", {
        id_activity: $scope.id_activity,
        type: $scope.type
      });
    };
  }])

  .controller('RegistrationCompleteCtrl', ['$scope', '$rootScope', '$stateParams', 'stateGo', function ($scope, $rootScope, $stateParams, stateGo) {
    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

    $scope.id_activity = $stateParams.id_activity;
    $scope.type = $stateParams.type;

    $scope.showNotification = true;

    $scope.closeNotification = function () {
      $scope.showNotification = !$scope.showNotification;
    };

    $scope.complete = function () {
      stateGo.goToState('detail_activity', {
        id_activity: $scope.id_activity,
        type: $scope.type
      }, "back");
    };
  }]);
