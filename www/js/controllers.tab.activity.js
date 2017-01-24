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

    $rootScope.review = function (type, id) {
      console.log("type", type);
      console.log("id", id);
      $rootScope.inAnimation();
      $state.go("review", {
        type: type,
        id: id
      });
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

            $scope.uil.setUm(response.data.resultData[0].name);
            $scope.uil.setSpmid(response.data.resultData[0].sportmanid);
            $scope.uil.setAvatar(response.data.resultData[0].avatar);
            $scope.uil.setEmpty(false);

            $scope.uil.setEmail(response.data.resultData[0].email);
            $scope.uil.setPn(response.data.resultData[0].password);
            $scope.uil.setGender(response.data.resultData[0].gender);

            // console.log("UsrInfoLocal.sportmanid: " + UsrInfoLocal.sportmanid);

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
  .controller('ActivityCtrl', ['$scope', '$rootScope', 'getData', 'api', '$ionicSlideBoxDelegate', 'stateGo', function ($scope, $rootScope, getData, api, $ionicSlideBoxDelegate, stateGo) {

    // $scope.$on("$ionicView.enter", function () {
    //   $rootScope.clearHistory();
    // });

    $scope.firstEnter = true;
    $scope.activityList = [];
    $scope.bannerList = [];
    // $scope.mainGoodsList = [];

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

          $ionicSlideBoxDelegate.update();
        }, function errorCallback(err) {
          console.log("err:");
          console.log(err);
        });
    };
    $scope.getActivityData();
    $scope.firstEnter = false;

    $scope.toDetail = function (activity_id) {
      stateGo.goToState('detail_activity', {
        type: "activity",
        id: activity_id
      });
    };
  }])

  // 主页商品详细页面控制器
  .controller('DetailActivityCtrl', ['$scope', '$rootScope', '$stateParams', 'getData', 'api', function ($scope, $rootScope, $stateParams, getData, api) {

    $scope.viewTitle = "活动详细";
    $scope.activity_id = $stateParams.id;
    $scope.type = $stateParams.type;
    // console.log("$scope.activity_id:", $scope.activity_id);
    // console.log("$scope.type:", $scope.type);

    $scope.activity = {};

    $scope.getActivityInfo = function () {
      getData.post(api.activity_detail, {
          id: $scope.activity_id
        })
        .then(function resolve(res) {
          // console.log("res.data:", res.data);
          $scope.activity = res.data.resultData;
        }, function reject(err) {
          console.log("err:", err);
        });
    };
    $scope.getActivityInfo();

    $scope.attendActivity = function () {
      // todo
    };

    $scope.addStar = function () {
      // todo
    };

    $scope.addRecommend = function () {
      // todo
    };
  }])

  // 报名参加活动
  .controller('RegistrationInstructionCtrl', ['$scope', 'stateGo', function ($scope, stateGo) {

    $scope.isAgree = false;

    $scope.agreeTreaty = function () {
      // todo
      if ($scope.isAgree) {
        stateGo.goToState("registration-information");
      } else {
        alert("请阅读并同意协议后才能进行下一步操作");
      }
    };
  }])

  .controller('RegistrationInformationCtrl', ['$scope', 'stateGo', function ($scope, stateGo) {

    $scope.information = {
      // todo
    };

    $scope.submitInformation = function () {
      // todo
      stateGo.goToState("registration-complete");
    };
  }])

  .controller('RegistrationCompleteCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

    $scope.showNotification = true;

    $scope.closeNotification = function () {
      $scope.showNotification = !$scope.showNotification;
    };
  }]);
