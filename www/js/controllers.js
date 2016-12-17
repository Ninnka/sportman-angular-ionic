angular.module('starter.controllers', [], function ($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  // 默认的$http post的请求参数会被转换成json对象，这里把它重新转换成get形式的参数拼接
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  var param = function (obj) {
    var query = '';
    var name;
    var value;
    var fullSubName;
    var subName;
    var subValue;
    var innerObj;
    var i;
    for (name in obj) {
      value = obj[name];
      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  };
  // Override $http service's default transformRequest
  // 重写$http服务的默认请求转换
  $httpProvider.defaults.transformRequest = [function (data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
})

.controller('AppCtrl', ['$scope', '$rootScope', 'SignInOrUpFac', 'ls', function ($scope, $rootScope, SignInOrUpFac, ls) {
  console.log("init AppCtrl");
  $rootScope.globalSignSymbol = false;
  $scope.globalUsrname = ls.get("usrname", "");
  $scope.globalPassword = ls.get("usrpassword", "");

  // $rootScope.testnum = 1;

  if ($scope.globalUsrname !== "" && $scope.globalPassword !== "") {
    SignInOrUpFac.signIn($scope.globalUsrname, $scope.globalPassword)
      .then(function resolve(response) {
        console.log("global sign in");
        if (response.data.resultStatus === "success") {
          $rootScope.globalSignSymbol = true;
          $rootScope.um = response.data.usrnm;
          console.log("global success");
        } else {
          console.log("global fail");
        }
      });
  }
}])

.controller('HomeCtrl', function ($scope, ajaxGetData, $ionicSlideBoxDelegate, $state) {
  $scope.firstEnter = true;

  $scope.$on("$ionicView.enter", function () {
    if (!$scope.firstEnter) {
      $ionicSlideBoxDelegate.start();
    }
  });

  $scope.bannerListLoaded = false;
  $scope.mainGoodsListLoaded = false;
  $scope.goodsListAll = ajaxGetData.ajaxGet("http://www.hehe168.com/mapi.php?act=getGoods")
    .then(function successCallback(res) {
      console.log("res:");
      console.log(res);

      $scope.bannerList = res.data.bannerList;
      $scope.bannerListLoaded = true;

      $scope.mainGoodsList = res.data.shareList;
      $scope.mainGoodsListLoaded = true;

      return res.data;
    }, function errorCallback(err) {
      console.log("err:");
      console.log(err);
    });
  $scope.firstEnter = false;
})

.controller('HomeGoodsDetailCtrl', function ($scope, $ionicHistory, $stateParams) {
  $scope.viewTitle = $stateParams.itemname;

  $scope.toBackView = function () {
    $ionicHistory.goBack(-1);
  };
  var vh = $ionicHistory.viewHistory();
  console.log("vh");
  console.log(vh);
})

.controller('CategoryCtrl', function ($scope) {
  console.log("init CatetoryCrtl");
})

.controller('FindCtrl', ["$scope", "$http", "constantParams", "valueParams", "provideTest", "getData", "ajaxGetData", "studentsService", "$timeout", function ($scope, $http, constantParams, valueParams, provideTest, getData, ajaxGetData, studentsService, $timeout) {
  console.log("init FindCtrl");

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

.controller('ShoppingCarCtrl', ["$scope", "studentsService", "ajaxGetData", "getData", function ($scope, studentsService, ajaxGetData, getData) {
  console.log("init ShoppingCarCtrl");

  // 测试用，可删除
  $scope.getGoodsData = function () {};
  }])

.controller('MyCtrl', ['$scope', '$timeout', '$ionicModal', '$rootScope', 'ls', 'SignInOrUpFac', function ($scope, $timeout, $ionicModal, $rootScope, ls, SignInOrUpFac) {

  // create modal
  // use for test
  $ionicModal.fromTemplateUrl("my-signup-modal.html", {
      scope: $scope,
      animation: 'slide-in-up'
    })
    .then(function (modal) {
      console.log("modal success");
      $scope.signModal = modal;
    }, function (err) {
      console.log("err");
      console.log(err);
    });
  $scope.$on('$destroy', function () {
    $scope.signModal.remove();
  });
  $scope.openSignUpModal = function () {
    $scope.signModal.show();
  };
  $scope.closeSignUpModal = function () {
    $scope.signModal.hide();
  };
  $scope.$on("modal.show", function () {
    // todo
    console.log("modal.show");
  });
  $scope.$on("modal.hidden", function () {
    // todo
    console.log("modal.hidden");
  });
  $scope.$on("modal.removed", function () {
    // todo
    console.log("modal.removed");
  });

  // 控制表单与主内容的显示
  $scope.my = {
    form: false,
    content: false
  };

  // 提交账户信息相关
  // 对象形式，与子controller共享
  $scope.usrinfo = {
    usrname: "",
    usrpassword: ""
  };

  // 其他信息
  $scope.resultFail = false;
  $scope.resultErrorText = "";

  // 登录提交回调函数
  $scope.loginSubmit = function () {
    SignInOrUpFac.signIn($scope.usrinfo.usrname, $scope.usrinfo.usrpassword)
      .then(function resolve(response) {
        // $scope.response = response;
        if (response.data.resultStatus === "success") {
          $scope.resultFail = false;
          $rootScope.um = response.data.usrnm;

          // storage in local
          ls.set("usrpassword", $scope.usrinfo.usrpassword);

          ls.set("usrname", $scope.usrinfo.usrname);
          ls.set("avatar", response.data.avatar);

          console.log("on signinsuccess");
          $scope.my.form = false;
          $scope.my.content = true;
          $scope.usrinfo = undefined;
        } else {
          $scope.resultFail = true;
          $scope.resultErrorText = "账户名或密码出错";
          $timeout(function () {
            $scope.resultFail = false;
          }, 4000);
        }
      }, function reject(err) {
        $scope.resultFail = "true";
        $scope.resultErrorText = "网络连接出错";
        $timeout(function () {
          $scope.resultFail = false;
        }, 4000);
        console.log("err");
        console.log(err);
      });
  };

  // if ($rootScope.globalSignSymbol === true) {
  //   console.log("globalSignSymbol is true");
  //   $scope.my.content = true;
  //   $scope.my.form = false;
  // } else {
  //   console.log("globalSignSymbol is false");
  //   $scope.my.content = false;
  //   $scope.my.form = true;
  // }

  // 注册相关信息
  $scope.signupInfo = {
    usrname: "",
    usrpassword: ""
  };

  // 注册回调方法
  $scope.signupSubmit = function () {
    console.log("signupSubmit");
    SignInOrUpFac.signUp($scope.signupInfo.usrname, $scope.signupInfo.usrpassword)
      .then(function resolve(response) {
        console.log("sign up success");
        console.log(response.data);
        console.log(response.data.resultStatus);
        console.log(response.data.reason);
      }, function reject(err) {
        console.log("sign up fail");
        console.log(err);
      });
  };

  // 观察全局变量
  $scope.$watch("globalSignSymbol", function (newValue, oldValue, scope) {
    console.log("change");
    if (newValue === true) {
      $scope.my.content = true;
      $scope.my.form = false;
    } else if (newValue === false) {
      $scope.my.content = false;
      $scope.my.form = true;
    }
  }, true);

  }])

.controller('LoginCtrl', ['$scope', '$timeout', 'ls', 'SignInOrUpFac', function ($scope, $timeout, ls, SignInOrUpFac) {

}])

// test isolate scope and link function in directive，测试directive的独立作用域和link函数
// this directive use in shoppingcar.html，用在了shoppingcar.html上，删除时注意!
.controller('myDirectiveCtrl', function ($scope, $element, $attrs, $transclude) {
  $scope.collectionCount = "100";
  $scope.historyCount = {
    yesterday: "300",
    today: "200"
  };
  $scope.showvalue = function () {
    console.log("showvalue: " + $scope.value);
  };
});

// .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })
