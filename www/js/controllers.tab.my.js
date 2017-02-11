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

            $scope.uil.setid(response.data.resultData[0].id);
            $scope.uil.setUm(response.data.resultData[0].name);
            $scope.uil.setSpmid(response.data.resultData[0].sportmanid);
            $scope.uil.setAvatar(response.data.resultData[0].avatar);
            $scope.uil.setEmpty(false);

            $scope.uil.setEmail(response.data.resultData[0].email);
            $scope.uil.setPn(response.data.resultData[0].password);
            $scope.uil.setGender(response.data.resultData[0].gender);

            // storage in local
            ls.set("id", response.data.resultData[0].id);
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

  .controller('myCollectionsActivityComingCtrl', ['$scope', '$rootScope', 'stateGo', 'getData', 'api', 'UsrInfoLocal', function ($scope, $rootScope, stateGo, getData, api, UsrInfoLocal) {
    $scope.activityList = [];
    $scope.getDataPromise = '';
    $scope.hasFirstLoad = false;

    $scope.getActivityInfo = function () {
      $scope.getDataPromise = getData.post(api.user_activity, {
        id: UsrInfoLocal.id,
        status: '待举行'
      });
    };
    $scope.getActivityInfo();

    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

    $scope.$on('$ionicView.afterEnter', function () {
      if (!$scope.hasFirstLoad) {
        console.log("firstLoad");
        $scope.hasFirstLoad = true;
        $scope.getDataPromise
          .then(function resolve(res) {
            $scope.activityList = res.data.resultData;
          }, function reject(err) {
            console.log("err:", err);
          });
      }
    });
  }])

  .controller('myCollectionsActivityInvestigatingCtrl', ['$scope', '$rootScope', 'stateGo', 'getData', 'api', 'UsrInfoLocal', function ($scope, $rootScope, stateGo, getData, api, UsrInfoLocal) {
    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });
    $scope.activityList = [];

    $scope.getActivityInfo = function () {
      getData.post(api.user_activity, {
          id: UsrInfoLocal.id,
          status: '审核中'
        })
        .then(function resolve(res) {
          $scope.activityList = res.data.resultData;
        }, function reject(err) {
          console.log("err:", err);
        });
    };
    $scope.getActivityInfo();
  }])

  .controller('myCollectionsActivityFinishedCtrl', ['$scope', '$rootScope', 'stateGo', 'getData', 'api', 'UsrInfoLocal', function ($scope, $rootScope, stateGo, getData, api, UsrInfoLocal) {
    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

    $scope.review = function (id_user, id_activity) {
      console.log("go to review");
      stateGo.goToState('review', {
        id_user: id_user,
        id_activity: id_activity
      });
    };

    $scope.activityList = [];

    $scope.getActivityInfo = function () {
      getData.post(api.user_activity, {
          id: UsrInfoLocal.id,
          status: '已结束'
        })
        .then(function resolve(res) {
          // console.log("res.data:", res.data);
          $scope.activityList = res.data.resultData;
        }, function reject(err) {
          console.log("err:", err);
        });
    };
    $scope.getActivityInfo();
  }])

  .controller('myCollectionsActivityAllCtrl', ['$scope', '$rootScope', 'stateGo', 'getData', 'api', 'UsrInfoLocal', function ($scope, $rootScope, stateGo, getData, api, UsrInfoLocal) {
    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

    $scope.show_status = true;

    $scope.review = function (id_user, id_activity) {
      console.log("go to review");
      stateGo.goToState('review', {
        id_user: id_user,
        id_activity: id_activity
      });
    };

    $scope.activityList = [];

    $scope.getActivityInfo = function () {
      getData.post(api.user_activity, {
          id: UsrInfoLocal.id,
          status: 'all'
        })
        .then(function resolve(res) {
          // console.log("res.data:", res.data);
          $scope.activityList = res.data.resultData;
        }, function reject(err) {
          console.log("err:", err);
        });
    };
    $scope.getActivityInfo();
  }])

  // 我的场馆
  .controller('myCollectionsStadiumCtrl', ['$scope', function ($scope) {

  }])

  .controller('myCollectionsStadiumAvailableCtrl', ['$scope', '$rootScope', 'getData', 'api', 'UsrInfoLocal', function ($scope, $rootScope, getData, api, UsrInfoLocal) {
    $scope.stadiumList = [];
    $scope.getDataPromise = '';
    $scope.hasFirstLoad = false;

    $scope.getStadiumList = function () {
      $scope.getDataPromise = getData.post(api.user_stadium, {
        id: UsrInfoLocal.id,
        status: '待使用'
      });
    };
    $scope.getStadiumList();

    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

    $scope.$on('$ionicView.afterEnter', function () {
      if (!$scope.hasFirstLoad) {
        console.log("firstLoad");
        $scope.hasFirstLoad = true;
        $scope.getDataPromise
          .then(function resolve(res) {
            console.log("res.data:", res.data);
            $scope.stadiumList = res.data.resultData;
          }, function reject(err) {
            console.log("err:", err);
          });
      }
    });

  }])

  .controller('myCollectionsStadiumUsedCtrl', ['$scope', '$rootScope', 'getData', 'api', 'UsrInfoLocal', function ($scope, $rootScope, getData, api, UsrInfoLocal) {
    $scope.stadiumList = [];

    $scope.getStadiumList = function () {
      getData.post(api.user_stadium, {
          id: UsrInfoLocal.id,
          status: '已使用'
        })
        .then(function resolve(res) {
          console.log("res.data:", res.data);
          $scope.stadiumList = res.data.resultData;
        }, function reject(err) {
          console.log("err:", err);
        });
    };
    $scope.getStadiumList();

    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });
  }])

  .controller('myCollectionsStadiumAllCtrl', ['$scope', '$rootScope', 'getData', 'api', 'UsrInfoLocal', function ($scope, $rootScope, getData, api, UsrInfoLocal) {
    $scope.stadiumList = [];
    $scope.show_status = true;

    $scope.getStadiumList = function () {
      getData.post(api.user_stadium, {
          id: UsrInfoLocal.id,
          status: 'all'
        })
        .then(function resolve(res) {
          console.log("res.data:", res.data);
          $scope.stadiumList = res.data.resultData;
        }, function reject(err) {
          console.log("err:", err);
        });
    };
    $scope.getStadiumList();

    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });
  }])

  // 我的收藏
  .controller('myCollectionStarCtrl', ['$scope', function ($scope) {

  }])

  .controller('myCollectionStarActivityCtrl', ['$scope', '$rootScope', 'getData', 'api', 'UsrInfoLocal', function ($scope, $rootScope, getData, api, UsrInfoLocal) {

    $scope.activityList = [];
    $scope.getDataPromise = '';
    $scope.hasFirstLoad = false;

    $scope.getActivityList = function () {
      $scope.getDataPromise = getData.post(api.user_activity_star, {
        id: UsrInfoLocal.id
      });
    };
    $scope.getActivityList();

    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

    $scope.$on("$ionicView.afterEnter", function () {
      if (!$scope.hasFirstLoad) {
        $scope.hasFirstLoad = true;
        $scope.getDataPromise
          .then(function resolve(res) {
            $scope.activityList = $scope.activityList.concat(res.data.resultData);
          }, function reject(err) {
            console.log('err:', err);
          });
      }
    });
  }])

  .controller('myCollectionStarStadiumCtrl', ['$scope', '$rootScope', 'getData', 'api', 'UsrInfoLocal', function ($scope, $rootScope, getData, api, UsrInfoLocal) {
    $scope.stadiumList = [];

    $scope.getStadiumList = function () {
      getData.post(api.user_stadium_star, {
          id: UsrInfoLocal.id
        })
        .then(function resolve(res) {
          $scope.stadiumList = $scope.stadiumList.concat(res.data.resultData);
        }, function reject(err) {
          console.log('err:', err);
        });
    };
    $scope.getStadiumList();

    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

  }])


  // 我的评论
  .controller('myReviewCtrl', ['$scope', function ($scope) {

  }])

  .controller('myUnreviewCtrl', ['$scope', '$rootScope', 'getData', 'api', 'UsrInfoLocal', function ($scope, $rootScope, getData, api, UsrInfoLocal) {
    $scope.unReviewList = [];
    $scope.getDataPromise = '';
    $scope.hasFirstLoad = false;

    $scope.getUnReviewList = function () {
      $scope.getDataPromise = getData.post(api.user_review, {
        id: UsrInfoLocal.id,
        status: '未评价'
      });
    };
    $scope.getUnReviewList();

    $scope.$on('$ionicView.enter', function () {
      $rootScope.clearHistory();
    });

    $scope.$on('$ionicView.afterEnter', function () {
      if (!$scope.hasFirstLoad) {
        $scope.hasFirstLoad = true;
        $scope.getDataPromise
          .then(function resolve(res) {
            $scope.unReviewList = $scope.unReviewList.concat(res.data.resultData);
          }, function reject(err) {
            console.log('err:', err);
          });
      }
    });
  }])

  .controller('myReviewedCtrl', ['$scope', '$rootScope', 'getData', 'api', 'UsrInfoLocal', function ($scope, $rootScope, getData, api, UsrInfoLocal) {
    $scope.reviewList = [];

    $scope.getReviewList = function () {
      getData.post(api.user_review, {
          id: UsrInfoLocal.id,
          status: '未评价'
        })
        .then(function resolve(res) {
          $scope.reviewList = $scope.reviewList.concat(res.data.resultData);
        }, function reject(err) {
          console.log('err:', err);
        });
    };
    // $scope.getReviewList();
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
