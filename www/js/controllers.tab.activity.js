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
        if (response.data.resultStatus === "success") {
          $rootScope.globalSignSymbol = true;

          $scope.uil.setUm(response.data.usrnm);
          $scope.uil.setSpmid(response.data.sportmanid);
          $scope.uil.setAvatar(response.data.avatar);
          $scope.uil.setEmpty(false);

          $scope.uil.setEmail(response.data.usremail);
          $scope.uil.setPn(response.data.usrpn);
          $scope.uil.setGender(response.data.usrgender);

          // console.log("UsrInfoLocal.sportmanid: " + UsrInfoLocal.sportmanid);

          ls.set("usrpassword", response.data.usrpw);
          ls.set("usrname", response.data.usrnm);
          ls.set("avatar", response.data.avatar);
          ls.set("sportmanid", response.data.sportmanid);

          ls.set("email", response.data.usremail);
          ls.set("phonenumber", response.data.usrpn);
          ls.set("gender", response.data.usrgender);

        } else {
          console.log("global fail");
        }
      });
  }
}])

// 主页控制器
.controller('ActivityCtrl', ['$scope', '$rootScope', 'ajaxGetData', '$ionicSlideBoxDelegate', function ($scope, $rootScope, ajaxGetData, $ionicSlideBoxDelegate) {

  // $scope.$on("$ionicView.enter", function () {
  //   $rootScope.clearHistory();
  // });

  $scope.firstEnter = true;
  $scope.bannerList = [];
  $scope.mainGoodsList = [];

  $scope.$on("$ionicView.enter", function () {
    if (!$scope.firstEnter) {
      $ionicSlideBoxDelegate.start();
    }
  });

  $scope.goodsListAll = ajaxGetData.ajaxGet("http://www.hehe168.com/mapi.php?act=getGoods")
    .then(function successCallback(res) {

      $scope.bannerList = $scope.bannerList.concat(res.data.bannerList);

      $scope.mainGoodsList = $scope.mainGoodsList.concat(res.data.shareList);

      $ionicSlideBoxDelegate.update();

      return res.data;
    }, function errorCallback(err) {
      console.log("err:");
      console.log(err);
    });
  $scope.firstEnter = false;
}])

// 主页商品详细页面控制器
.controller('DetailActivityCtrl', ['$scope', '$rootScope', '$stateParams', function ($scope, $rootScope, $stateParams) {

  $scope.viewTitle = "详细页面";

  $scope.activity = {
    activityid: "",
    activityname: "2016广州马拉松",
    activitypost: "img/activitypost.png",
    acitivtyhostavatar: "img/marason-icon.png",
    activitywebsite: "www.gzmarathon.com",
    activitystarttime: "2016年04月01日",
    activityposition: "花城广场（起点）",
    acitvityprice: "100",
    activityhost: "广州体育局",
    activityhostaddress: "广州市天河区天河路299号天河体育中心",
    activitycontact: "12345678910"
  };

  $scope.getActivityInfo = function () {
    // todo
  };

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
      alert("请阅读并同意协议后才能进行下一步操作")
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