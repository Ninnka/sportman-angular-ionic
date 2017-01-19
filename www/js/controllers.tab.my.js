angular.module('starter.controllers.tab.my', [])

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

  $scope.activityList = [
    {
      activityname: "彩色跑",
      activitystatus: "待举行",
      activitypost: "img/colorrunning-icon.png",
      activityregistertime: "1484396287893",
      activitystarttime: "1484396287893",
      activityposition: "广州市天河区珠江新城花城广场"
    }
  ];
}])

.controller('myCollectionsActivityInvestigatingCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });
  $scope.activityList = [
    {
      activityname: "2016广州马拉松",
      activitystatus: "审核中",
      activitypost: "img/marason-icon.png",
      activityregistertime: "1484396287893",
      activitystarttime: "1484396287893",
      activityposition: "广州市天河区珠江新城花城广场"
    }
  ];
}])

.controller('myCollectionsActivityFinishedCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });
  $scope.info = {
    type: "activity",
    id: "109283"
  };
  $scope.activityList = [
    {
      activityname: "彩色跑",
      activitystatus: "已结束",
      activitypost: "img/colorrunning-icon.png",
      activityregistertime: "1484396287893",
      activitystarttime: "1484396287893",
      activityposition: "广州市天河区珠江新城花城广场"
    }
  ];
}])

.controller('myCollectionsActivityAllCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });
  $scope.activityList = [
    {
      activityname: "TheLightRun——地球上最闪亮的夜跑球上最闪亮的",
      activitystatus: "待举行",
      activitypost: "img/running-icon.png",
      activityregistertime: "1484396287893",
      activitystarttime: "1484396287893",
      activityposition: "广州市天河区珠江新城花城广场"
    },
    {
      activityname: "2016广州马拉松",
      activitystatus: "审核中",
      activitypost: "img/marason-icon.png",
      activityregistertime: "1484396287893",
      activitystarttime: "1484396287893",
      activityposition: "广州市天河区珠江新城花城广场"
    },
    {
      activityname: "彩色跑",
      activitystatus: "已结束",
      activitypost: "img/colorrunning-icon.png",
      activityregistertime: "1484396287893",
      activitystarttime: "1484396287893",
      activityposition: "广州市天河区珠江新城花城广场"
    }
  ];
}])


// 我的场馆
.controller('myCollectionsStadiumCtrl', ['$scope', function ($scope) {

}])

.controller('myCollectionsStadiumAvailableCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });

  $scope.stadiumList = [
    {
      stadiumname: "大厅桌球",
      stadiumstatus: "待使用",
      stadiumpost: "img/stadium-tenis-icon1.png",
      stadiummount: 2,
      stadiumstarttime: "1484396287893",
      stadiumposition: "广州市天河区珠江新城花城广场"
    }
  ];
}])

.controller('myCollectionsStadiumUsedCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });

  $scope.stadiumList = [
    {
      stadiumname: "室内篮球",
      stadiumstatus: "已使用",
      stadiumpost: "img/stadium-tenis-icon3.png",
      stadiummount: 1,
      stadiumstarttime: "1484396287893",
      stadiumposition: "广州市天河区珠江新城花城广场"
    }
  ];
}])

.controller('myCollectionsStadiumAllCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });

  $scope.stadiumList = [
    {
      stadiumname: "大厅桌球",
      stadiumstatus: "待使用",
      stadiumpost: "img/stadium-tenis-icon1.png",
      stadiummount: 2,
      stadiumstarttime: "1484396287893",
      stadiumposition: "广州市天河区珠江新城花城广场"
    },
    {
      stadiumname: "室内篮球",
      stadiumstatus: "已使用",
      stadiumpost: "img/stadium-tenis-icon3.png",
      stadiummount: 1,
      stadiumstarttime: "1484396287893",
      stadiumposition: "广州市天河区珠江新城花城广场"
    }
  ];
}])

// 我的收藏
.controller('myCollectionStarCtrl', ['$scope', function ($scope) {

}])

.controller('myCollectionStarActivityCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });

  $scope.$on("$ionicView.afterEnter", function () {
    $scope.activityList = [
      {
        activityname: "白云山野战场畅玩",
        activityposition: "海珠区",
        activitypost: "img/marason-star.png",
        activityhost: "广州体育委员会",
        activityattence: 11,
        activitymountpeople: 30,
        activityprice: 99,
        activitystarttime: "1484396287893"
      },
      {
        activityname: "广州马拉松",
        activityposition: "白云区",
        activitypost: "img/shot-star.png",
        activityhost: "白云山野战场",
        activityattence: 11,
        activitymountpeople: 30,
        activityprice: 199,
        activitystarttime: "1484396287893"
      },
      {
        activityname: "轮滑逛街活动",
        activityposition: "白云区",
        activitypost: "img/skip-star.png",
        activityhost: "阿迪王专业体育用具",
        activityattence: 11,
        activitymountpeople: 30,
        activityprice: 199,
        activitystarttime: "1484396287893"
      },
      {
        activityname: "荧光夜跑——地",
        activityposition: "白云区",
        activitypost: "img/tabletenis-star.png",
        activityhost: "阿迪王专业体育用具",
        activityattence: 11,
        activitymountpeople: 30,
        activityprice: 199,
        activitystarttime: "1484396287893"
      },
      {
        activityname: "荧光夜跑——地",
        activityposition: "白云区",
        activitypost: "img/tabletenis-star.png",
        activityhost: "阿迪王专业体育用具",
        activityattence: 11,
        activitymountpeople: 30,
        activityprice: 199,
        activitystarttime: "1484396287893"
      }
    ];
  });

}])

.controller('myCollectionStarStadiumCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });

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
    }
  ];
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

// 我的推荐
.controller('myRecommendCtrl', ['$scope', function ($scope) {

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
}]);
