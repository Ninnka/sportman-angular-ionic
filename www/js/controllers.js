angular.module('starter.controllers', [])

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
}])

// 场馆页面的控制器
.controller('StadiumCtrl', ['$scope', 'stateGo', function ($scope, stateGo) {

  $scope.toDetail = function () {
    stateGo.goToState("detail_stadium");
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
    },
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
    }
  ];
}])

.controller('DetailStadiumCtrl', ['$scope', 'stateGo', function ($scope, stateGo) {

  $scope.viewTitle = "详细页面";

  $scope.totalScore = 3.5;

  $scope.bookStadium = function () {
    console.log("bookStadium");
    stateGo.goToState("detail_stadium_book-list", {
      type: "乒乓球",
      id: 111111
    });
  };

}])

.controller('BooklistStadiumCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
  $scope.type = $stateParams.type;
  $scope.id = $stateParams.id;
  // console.log("type:", $stateParams.type);
  // console.log("id:", $stateParams.id);

  $scope.equipmentLsit = [
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 9,
      equipmentremain: 18
    },
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 19,
      equipmentremain: 30
    },
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 59,
      equipmentremain: 10
    },
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 9,
      equipmentremain: 9
    },
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 29,
      equipmentremain: 39
    },
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 119,
      equipmentremain: 25
    },
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 70,
      equipmentremain: 40
    }
  ];
}])

.controller('BookselectStadiumCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
  $scope.type = $stateParams.type;
  $scope.id = $stateParams.id;

  $scope.selectinfo = {
    selectMount: 1,
    selectStartTime: "",
    selectEndTime: ""
  }
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
