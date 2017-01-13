angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', '$rootScope', '$state', 'SignInOrUpFac', 'ls', '$ionicHistory', 'UsrInfoLocal', 'Logout', '$ionicViewSwitcher', '$cordovaBarcodeScanner', function ($scope, $rootScope, $state, SignInOrUpFac, ls, $ionicHistory, UsrInfoLocal, Logout, $ionicViewSwitcher, $cordovaBarcodeScanner) {

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
.controller('HomeGoodsDetailCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
  $scope.viewTitle = $stateParams.itemname;
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

// 登录注册页面的控制器
.controller('SignInUpCtrl', ['$scope', '$timeout', '$ionicModal', '$rootScope', 'ls', 'SignInOrUpFac', 'UsrInfoLocal', '$ionicHistory', function ($scope, $timeout, $ionicModal, $rootScope, ls, SignInOrUpFac, UsrInfoLocal, $ionicHistory) {

  // create modal
  // use for test
  $ionicModal.fromTemplateUrl("my-signup-modal.html", {
      scope: $scope,
      animation: 'slide-in-up'
    })
    .then(function (modal) {
      // console.log("modal success");
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
  });
  $scope.$on("modal.hidden", function () {
    // todo
  });
  $scope.$on("modal.removed", function () {
    // todo
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

          // console.log("on signinsuccess");

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

}])


// 我的活动
.controller('myCollectionsActivityCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

}])

.controller('myCollectionsActivityComingCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });
}])

.controller('myCollectionsActivityInvestigatingCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });
}])

.controller('myCollectionsActivityFinishedCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });
  $scope.info = {
    type: "activity",
    id: "109283"
  };
}])

.controller('myCollectionsActivityAllCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });
}])


// 我的场馆
.controller('myCollectionsStadiumCtrl', ['$scope', function ($scope) {

}])

.controller('myCollectionsStadiumAvailableCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });
}])

.controller('myCollectionsStadiumUsedCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });
}])

.controller('myCollectionsStadiumAllCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });
}])

// 我的收藏
.controller('myCollectionStarCtrl', ['$scope', function ($scope) {

}])

.controller('myCollectionStarActivityCtrl', ['$scope', function ($scope) {

}])

.controller('myCollectionStarStadiumCtrl', ['$scope', function ($scope) {

}])


// 我的评论
.controller('myReviewCtrl', ['$scope', function ($scope) {

}])

.controller('myUnreviewCtrl', ['$scope', function ($scope) {

}])

.controller('myReviewedCtrl', ['$scope', function ($scope) {

}])

// 付款管理
.controller('myPaymentCtrl', ['$scope', function ($scope) {

}])

.controller('myPaymentActivityCtrl', ['$scope', function ($scope) {

}])

.controller('myPaymentStadiumCtrl', ['$scope', function ($scope) {

}])

.controller('myPaymentPaidCtrl', ['$scope', function ($scope) {

}])

// 我的历史
.controller('myHistoryCtrl', ['$scope', function ($scope) {

}])


// 消息推送
.controller('mySubscription', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {

  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });

  $scope.tab = {
    activities: true,
    companies: false
  };

  $scope.contentList = {
    activities: [],
    companies: []
  };

  $scope.getMoreActiviesList = function () {

  };
  $scope.getMoreCompaniesList = function () {

  };
}])

.controller('mySubscriptionActivities', ['$scope', '$rootScope', '$ionicHistory', function ($scope, $rootScope, $ionicHistory) {
  console.log("init mySubscriptionActivities");

  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });
}])

.controller('mySubscriptionCompanies', ['$scope', '$rootScope', '$ionicHistory', function ($scope, $rootScope, $ionicHistory) {
  console.log("init mySubscriptionCompanies");

  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
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
}])


/**
 * ----------------------------------------------------------------------------------------------------------------
 * 设置部分
 */

// 密码部分
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
    console.log($scope.passwordModify.enterPW);
    if ($scope.passwordModify.compare()) {
      console.log("提交成功");
    } else {
      console.log("密码不一致");
    }
  };

}])

// 手机检测绑定
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

// 绑定手机
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

// 更换手机
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

// 认证手机
.controller('settingValidateMobileCtrl', ['$scope', function ($scope) {

}])

// 更新邮箱
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

// 更新id
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
}])

// 系统通知
.controller('settingNotificationCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {

}])

// 隐私
.controller('settingPrivacyCtrl', ['$scope', function ($scope) {

}])

// 通用设置
.controller('settingUniversalCtrl', ['$scope', function ($scope) {

}])

// 反馈
.controller('settingFeedbackCtrl', ['$scope', function ($scope) {

}])

// 关于
.controller('settingAboutCtrl', ['$scope', function ($scope) {

}]);

/**
 * 设置部分
 * ----------------------------------------------------------------------------------------------------------------
 */
