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

.controller('AppCtrl', ['$scope', '$rootScope', '$state', 'SignInOrUpFac', 'ls', '$ionicHistory', 'UsrInfoLocal', 'Logout', '$ionicViewSwitcher', function ($scope, $rootScope, $state, SignInOrUpFac, ls, $ionicHistory, UsrInfoLocal, Logout, $ionicViewSwitcher) {
  console.log("init AppCtrl");

  $rootScope.clearHistory = function () {
    $ionicHistory.clearHistory();
  };

  $rootScope.checkSignSymbolAndState = function (targetState) {
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

  $rootScope.toBackView = function () {
    console.log("back");
    $ionicHistory.goBack(-1);
    $rootScope.outAnimation();
  };

  $rootScope.logout = function () {
    console.log("logout");
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
        console.log("global sign in");
        if (response.data.resultStatus === "success") {
          $rootScope.globalSignSymbol = true;

          $scope.uil.setUm(response.data.usrnm);
          $scope.uil.setSpmid(response.data.sportmanid);
          $scope.uil.setAvatar(response.data.avatar);
          $scope.uil.setEmpty(false);

          $scope.uil.setEmail(response.data.usremail);
          $scope.uil.setPn(response.data.usrpn);
          $scope.uil.setGender(response.data.usrgender);

          console.log("UsrInfoLocal.sportmanid: " + UsrInfoLocal.sportmanid);

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
.controller('HomeCtrl', ['$scope', 'ajaxGetData', '$ionicSlideBoxDelegate', function ($scope, ajaxGetData, $ionicSlideBoxDelegate) {
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
      console.log("res:");
      console.log(res);

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
.controller('HomeGoodsDetailCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
  $scope.viewTitle = $stateParams.itemname;
}])

// 分类页面的控制器
.controller('CategoryCtrl', ['$scope', function ($scope) {
  console.log("init CatetoryCrtl");
}])

// 发现页面的控制器
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

// 购物车页面的控制器
.controller('ShoppingCarCtrl', ["$scope", function ($scope) {
  console.log("init ShoppingCarCtrl");

  // 测试用，可删除
  $scope.getGoodsData = function () {};
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

// 登录注册页面的控制器
.controller('SignInUpCtrl', ['$scope', '$timeout', '$ionicModal', '$rootScope', 'ls', 'SignInOrUpFac', 'UsrInfoLocal', '$ionicHistory', function ($scope, $timeout, $ionicModal, $rootScope, ls, SignInOrUpFac, UsrInfoLocal, $ionicHistory) {

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

  // 提交账户信息相关
  // 对象形式，与子controller共享
  $scope.usrinfo = {
    usrname: "",
    usrpassword: ""
  };

  // 其他信息
  $scope.resultFail = false;
  $scope.resultErrorText = "";

  // 本地用户信息共享部分
  $scope.uil = UsrInfoLocal;

  // 登录提交回调函数
  $scope.loginSubmit = function () {
    SignInOrUpFac.signIn($scope.usrinfo.usrname, $scope.usrinfo.usrpassword)
      .then(function resolve(response) {
        // $scope.response = response;
        if (response.data.resultStatus === "success") {
          $scope.resultFail = false;

          $scope.uil.setUm(response.data.usrnm);
          $scope.uil.setSpmid(response.data.sportmanid);
          $scope.uil.setAvatar(response.data.avatar);
          $scope.uil.setEmpty(false);

          $scope.uil.setEmail(response.data.usremail);
          $scope.uil.setPn(response.data.usrpn);
          $scope.uil.setGender(response.data.usrgender);

          // storage in local
          ls.set("usrpassword", response.data.usrpw);
          ls.set("usrname", response.data.usrnm);
          ls.set("avatar", response.data.avatar);
          ls.set("sportmanid", response.data.sportmanid);

          ls.set("email", response.data.usremail);
          ls.set("phonenumber", response.data.usrpn);
          ls.set("gender", response.data.usrgender);

          console.log("on signinsuccess");

          // 清空本地登录信息存储
          $scope.usrinfo = undefined;

          $rootScope.globalSignSymbol = true;

          $rootScope.toBackView();

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

  }])

// 用户详细页控制器
.controller('usrDetailCtrl', ['$scope', function ($scope) {
  console.log("init usrDetailCtrl");
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
}])

.controller('settingAccountSecurityPasswordCtrl', ['$scope', 'UsrInfoLocal', function ($scope, UsrInfoLocal) {
  console.log("init settingAccountSecurityPasswordCtrl");
  $scope.uil = UsrInfoLocal;

  $scope.passwordModify = {
    enterPW: "",
    confirmPW: "",
    compare: function () {
      if (this.enterPW === this.confirmPW) {
        return true;
      }
      return false;

    }
  };

  $scope.resetInput = function () {
    $scope.passwordModify.enterPW = "";
    $scope.passwordModify.confirmPW = "";
  };

  $scope.submitInput = function () {
    if ($scope.passwordModify.compare()) {
      console.log("提交成功");
    } else {
      console.log("密码不一致");
    }
  };

}])

.controller('settingLinkMobileCtrl', ['$scope', "ls", function ($scope, ls) {

  $scope.mobileInfo = {
    phonenumber: ls.get("phonenumber", "")
  };

  $scope.bindSymbol = {
    hasBind: $scope.mobileInfo.phonenumber !== "",
    noBind: $scope.mobileInfo.phonenumber === ""
  };

  // 监听页面进入事件
  // $scope.$on("$ionicView.enter", function () {
  //
  // });

  $scope.bindMobile = function () {

  };

  $scope.changeMobile = function () {

  };
}])

.controller('settingBindMobileCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {

  $scope.bindmobile = {
    phonenumber: ""
  };

  $scope.resetInput = function () {
    $scope.bindmobile.phonenumber = "";
  };

  $scope.nextStep = function () {
    $state.go("appsetting_account-security_link-mobile_validatemobile");
    $rootScope.inAnimation();
  };
}])

.controller('settingChangeMobileCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
  $scope.bindmobile = {
    phonenumber: ""
  };

  $scope.resetInput = function () {
    $scope.bindmobile.phonenumber = "";
  };

  $scope.nextStep = function () {
    $state.go("appsetting_account-security_link-mobile_validatemobile");
    $rootScope.inAnimation();
  };
}])

.controller('settingUpdateEmail', ['$scope', 'UsrInfoLocal', function ($scope, UsrInfoLocal) {

  $scope.bindSymbol = {
    hasBind: UsrInfoLocal.email !== ""
  };

  $scope.bindEmail = {
    email: ""
  };

  $scope.resetInput = function () {
    $scope.bindEmail.email = "";
  };

  $scope.updateEmail = function () {
    console.log("submit email");
  };

}])

.controller('settingUpdateSportmanid', ['$scope', 'UsrInfoLocal', function ($scope, UsrInfoLocal) {

  $scope.bindSymbol = {
    hasBind: UsrInfoLocal.sportmanid !== ""
  };

  $scope.idPlaceholder = $scope.bindSymbol.hasBind ? UsrInfoLocal.sportmanid : "6-20个字母、数字、下划线和减号，必须以字母开头";

  $scope.bindSportmanid = {
    sportmanid: ""
  };

  $scope.resetInput = function () {
    $scope.bindSportmanid.sportmanid = "";
  };

  $scope.updateId = function () {
    console.log("updateId");
  };
}]);

// .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })
