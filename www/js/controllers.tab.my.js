angular.module('starter.controllers.tab.my', [])

  // 我的主页 的控制器
  .controller('MyCtrl', ['$scope', '$rootScope', 'UsrInfoLocal', function ($scope, $rootScope, UsrInfoLocal) {

    // 设置页面进入监听事件
    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

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

  .controller('myDirectiveCtrl', ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {
    // 测试directive的独立作用域和link函数,用在了shoppingcar.html上，删除时注意!

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

            $scope.uil.setUm(response.data.resultData[0].name);
            $scope.uil.setSpmid(response.data.resultData[0].sportmanid);
            $scope.uil.setAvatar(response.data.resultData[0].avatar);
            $scope.uil.setEmpty(false);

            $scope.uil.setEmail(response.data.resultData[0].email);
            $scope.uil.setPn(response.data.resultData[0].password);
            $scope.uil.setGender(response.data.resultData[0].gender);

            // storage in local
            ls.set("usrpassword", response.data.resultData[0].password);
            ls.set("usrname", response.data.resultData[0].name);
            ls.set("avatar", response.data.resultData[0].avatar);
            ls.set("sportmanid", response.data.resultData[0].sportmanid);

            ls.set("email", response.data.resultData[0].email);
            ls.set("phonenumber", response.data.resultData[0].mobile);
            ls.set("gender", response.data.resultData[0].gender);

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
          console.log(response.data.resultData);
          console.log(response.data.resultStatus);
          // console.log(response);
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
        name: "彩色跑",
        status: "待举行",
        post: "img/colorrunning-icon.png",
        registertime: "1484396287893",
        starttime: "1484396287893",
        position: "广州市天河区珠江新城花城广场"
      }
    ];
  }])

  .controller('myCollectionsActivityInvestigatingCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });
    $scope.activityList = [
      {
        name: "2016广州马拉松",
        status: "审核中",
        post: "img/marason-icon.png",
        registertime: "1484396287893",
        starttime: "1484396287893",
        position: "广州市天河区珠江新城花城广场"
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
        name: "彩色跑",
        status: "已结束",
        post: "img/colorrunning-icon.png",
        registertime: "1484396287893",
        starttime: "1484396287893",
        position: "广州市天河区珠江新城花城广场"
      }
    ];
  }])

  .controller('myCollectionsActivityAllCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });
    $scope.activityList = [
      {
        name: "TheLightRun——地球上最闪亮的夜跑球上最闪亮的",
        status: "待举行",
        post: "img/running-icon.png",
        registertime: "1484396287893",
        starttime: "1484396287893",
        position: "广州市天河区珠江新城花城广场"
    },
      {
        name: "2016广州马拉松",
        status: "审核中",
        post: "img/marason-icon.png",
        registertime: "1484396287893",
        starttime: "1484396287893",
        position: "广州市天河区珠江新城花城广场"
    },
      {
        name: "彩色跑",
        status: "已结束",
        post: "img/colorrunning-icon.png",
        registertime: "1484396287893",
        starttime: "1484396287893",
        position: "广州市天河区珠江新城花城广场"
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
        name: "大厅桌球",
        status: "待使用",
        post: "img/stadium-tenis-icon1.png",
        mount: 2,
        starttime: "1484396287893",
        position: "广州市天河区珠江新城花城广场"
      }
    ];
  }])

  .controller('myCollectionsStadiumUsedCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

    $scope.stadiumList = [
      {
        name: "室内篮球",
        status: "已使用",
        post: "img/stadium-tenis-icon3.png",
        mount: 1,
        starttime: "1484396287893",
        position: "广州市天河区珠江新城花城广场"
      }
    ];
  }])

  .controller('myCollectionsStadiumAllCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

    $scope.stadiumList = [
      {
        name: "大厅桌球",
        status: "待使用",
        post: "img/stadium-tenis-icon1.png",
        mount: 2,
        starttime: "1484396287893",
        position: "广州市天河区珠江新城花城广场"
    },
      {
        name: "室内篮球",
        status: "已使用",
        post: "img/stadium-tenis-icon3.png",
        mount: 1,
        starttime: "1484396287893",
        position: "广州市天河区珠江新城花城广场"
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
          name: "白云山野战场畅玩",
          position: "海珠区",
          thumbnail: "img/marason-star.png",
          host: "广州体育委员会",
          currentnumber: 11,
          totalnumber: 30,
          price: 99,
          starttime: "1484396287893"
      },
        {
          name: "广州马拉松",
          position: "白云区",
          thumbnail: "img/shot-star.png",
          host: "白云山野战场",
          currentnumber: 11,
          totalnumber: 30,
          price: 199,
          starttime: "1484396287893"
      },
        {
          name: "轮滑逛街活动",
          position: "白云区",
          thumbnail: "img/skip-star.png",
          host: "阿迪王专业体育用具",
          currentnumber: 11,
          totalnumber: 30,
          price: 199,
          starttime: "1484396287893"
      },
        {
          name: "荧光夜跑——地",
          position: "白云区",
          thumbnail: "img/tabletenis-star.png",
          host: "阿迪王专业体育用具",
          currentnumber: 11,
          totalnumber: 30,
          price: 199,
          starttime: "1484396287893"
      },
        {
          name: "荧光夜跑——地",
          position: "白云区",
          thumbnail: "img/tabletenis-star.png",
          host: "阿迪王专业体育用具",
          currentnumber: 11,
          totalnumber: 30,
          price: 199,
          starttime: "1484396287893"
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
        name: "胜利运动场（万寿路店）",
        thumbnail: "img/tabletenis-star.png",
        trade: "乒乓球、羽毛球",
        opentime: "08:00-22:00",
        area: "海珠区",
        price: 9
    },
      {
        name: "广州市射击射箭运动管理中心",
        thumbnail: "img/shot-stadium.png",
        trade: "台球、射箭、射击",
        opentime: "08:00-19:00",
        area: "天河区",
        price: 99
    },
      {
        name: "杰冠真人CS野战基地",
        thumbnail: "img/cs-stadium.png",
        trade: "仿真枪机野战",
        opentime: "08:00-18:00",
        area: "海珠区",
        price: 299
    },
      {
        name: "大世界保龄球馆",
        thumbnail: "img/bowling-stadium.png",
        trade: "仿真枪机野战",
        opentime: "08:00-18:00",
        area: "海珠区",
        price: 199
    },
      {
        name: "冰河湾真冰溜冰场",
        thumbnail: "img/skip-stadium.png",
        trade: "乒乓球、羽毛球",
        opentime: "08:00-22:00",
        area: "海珠区",
        price: 9
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
