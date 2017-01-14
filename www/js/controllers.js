angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', '$rootScope', '$state', 'SignInOrUpFac', 'ls', '$ionicHistory', 'UsrInfoLocal', 'Logout', '$ionicViewSwitcher', '$cordovaBarcodeScanner', '$document', '$window', function ($scope, $rootScope, $state, SignInOrUpFac, ls, $ionicHistory, UsrInfoLocal, Logout, $ionicViewSwitcher, $cordovaBarcodeScanner, $document, $window) {

  // 设置rem
  var winX = $document[0].body.clientWidth;
  var html = $document.find("html");
  html[0].style["font-size"] = winX / 640 * 100 + "px";

  $window.onresize = function () {
    var winX = $document[0].body.clientWidth;
    var html = $document.find("html");
    html[0].style["font-size"] = winX / 640 * 100 + "px";
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

  $rootScope.openSearch = function () {

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
.controller('ActivityCtrl', ['$scope', 'ajaxGetData', '$ionicSlideBoxDelegate', function ($scope, ajaxGetData, $ionicSlideBoxDelegate) {
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
.controller('DetailActivityCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
  $scope.viewTitle = "详细页面";
}])

// 分类页面的控制器
.controller('StadiumCtrl', ['$scope', function ($scope) {
  // console.log("init CatetoryCrtl");
}])

// 发现页面的控制器
.controller('FindCtrl', ["$scope", "$http", "constantParams", "valueParams", "provideTest", "getData", "ajaxGetData", "studentsService", "$timeout", function ($scope, $http, constantParams, valueParams, provideTest, getData, ajaxGetData, studentsService, $timeout) {
  // console.log("init FindCtrl");

  // 测试用，可删除
  // console.log("constantParams: " + constantParams);
  // console.log("valueParams: " + valueParams);
  // $scope.findContentList = $http({
  //     method: "GET",
  //     url: "http://www.hehe168.com/mapi.php?act=getGoods"
  //   })
  //   .then(function successCallback(res) {
  //     // console.log("res: ")
  //     // console.log(res);
  //     return res;
  //   }, function errorCallback(err) {
  //     console.log("err:");
  //     console.log(err);
  //     return [];
  //   });
  // $scope.getDataAjax = function () {
  // console.log("getData:");
  // console.log(getData);
  // console.log("provideTest");
  // console.log(provideTest);
  //
  // console.log("modify p1:");
  // getData.p1.pname = "p1_m";
  // console.log("getData_modify:");
  // console.log(getData);
  // };
  // console.log("getData:");
  // console.log(getData);
  // console.log("provideTest");
  // console.log(provideTest);

  // $timeout(function () {
  //   console.log("modify p1:");
  //   getData.p1.pname = "p1_m";
  //   console.log("getData_modify:");
  //   console.log(getData);
  // }, 5000);
  // studentsService.logSTC();
  // console.log("innerThing: " + studentsService.innerThing);
  // studentsService.modifySTC("STC modify");
  // studentsService.modifyInner("inner modify");

  }])

// 我的主页 的控制器
.controller('MyCtrl', ['$scope', '$rootScope', 'UsrInfoLocal', function ($scope, $rootScope, UsrInfoLocal) {

  // 控制个人信息视图显示
  $scope.my = {
    form: true,
    content: false
  };

  // 本地用户信息共享部分
  $scope.uil = UsrInfoLocal;

  // 观察全局变量
  $scope.$watch("globalSignSymbol", function (newValue, oldValue, scope) {
    console.log("change");
    if (newValue === true) {
      console.log("newValue: true");
      $scope.my.content = true;
      $scope.my.form = false;
    } else if (newValue === false) {
      console.log("newValue: false");
      $scope.my.content = false;
      $scope.my.form = true;
    }
  }, true);

  // 我的页面进入检测事件
  $scope.$on("$ionicView.enter", function () {
    console.log("enter my");
    $rootScope.clearHistory();
    if (UsrInfoLocal.empty === true) {
      console.log("empty");
      $rootScope.globalSignSymbol = false;
      $scope.my.content = false;
      $scope.my.form = true;
      $scope.usrinfo = {
        usrname: "",
        usrpassword: ""
      };
    }
  });

  }])

// 测试directive的独立作用域和link函数
// 用在了shoppingcar.html上，删除时注意!
.controller('myDirectiveCtrl', ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
  $scope.collectionCount = "100";
  $scope.historyCount = {
    yesterday: "300",
    today: "200"
  };
  $scope.showvalue = function () {
    console.log("showvalue: " + $scope.value);
  };
}]);
