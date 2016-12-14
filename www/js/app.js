// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
  .run(function ($ionicPlatform) {
    console.log("run before ionicPlatform ready");
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

  })
  .directive("myDirective", function () {
    console.log("initial myDirective");
    return {
      restrict: "EA",
      template(tElement, tAttrs) {
        return "\
        <div class='userinfo-wrapper'>\
          <p>用户名：{{userinfo.username}}</p>\
          <p>会员等级：{{userinfo.userlevel}}</p>\
          <p>收藏数量：{{collectionCount}}</p>\
          <p>历史数量：{{historyCount.today}}</p>\
          <p>测试：" +
          tAttrs.custominfo +
          "</p>\
          <input type='text' ng-model='value'><br>\
          value in local controller：{{value}}\
          <br><button class='button button-positive' ng-click='showvalue()'>\
        </div>";
      },
      replace: true,
      scope: {
        userinfo: "="
      },
      controller: "myDirectiveCtrl"
    };
  })
  .directive("templatescriptDirective", function () {
    console.log("initial scriptDirective");
    return {
      restrict: "EA",
      templateUrl: "part.html",
      replace: true
    };
  })
  .directive("transcludeDirective", function () {
    console.log("initial transcludeDirective");
    return {
      restrict: "EA",
      replace: true,
      transclude: true,
      template: "\
      <div>\
        <p>contentTitle</p>\
        <div ng-transclude></div>\
      </div\
      "
    };
  })
  .directive("formDirective", function () {
    console.log("initial formDirective");
    return {
      restrict: "EA",
      templateUrl: "templates/form.html",
      replace: true,
    };
  })
  .directive("linktestDirective", function () {
    return {
      template: "\
      <div>\
      <h1>标题</h1>\
      <p>这里是段落文字</p>\
      </div>\
      \
      ",
      replace: true,
      restrict: "EA",
      scope: {
        a: "=",
        b: "=",
        c: "="
      },
      controller: "myDirectiveCtrl",
      link(scope, element, attrs) {
        var h1_ele = element.find("h1");
        h1_ele.text("文本替换成为了strike，DOM操作应该在这里进行，我换了颜色及更改了字体大小，并且添加了移入移除事件");
        h1_ele.css({
          color: "red",
          "font-size": "14px"
        });
        h1_ele.on("mouseover", function () {
          h1_ele.css({
            background: "green"
          });
        });
        h1_ele.on("mouseout", function () {
          h1_ele.css({
            background: "purple"
          });
        });
      }
    };
  })
  .constant("constantParams", "constantParams value")
  .value("valueParams", "valueParams value")
  .service("studentsService", function () {
    console.log("initial studentsService instance");
    var somethingCommon = "somethingCommon_init";

    this.innerThing = "innerThing";
    this.modifyInner = function (modifyStr) {
      this.innerThing = modifyStr;
    };
    this.logSTC = function () {
      console.log("somethingCommon: " + somethingCommon);
    };
    this.modifySTC = function (modifyStr) {
      somethingCommon = modifyStr;
    };
  })
  .factory("getData", function () {
    console.log("initial getData instance");
    return {
      p1: {
        pname: "p1",
        page: "12"
      },
      p2: {
        pname: "p2",
        page: "13"
      },
      p3: {
        pname: "p3",
        page: "14"
      }
    };
  })
  .factory("ajaxGetData", function ($http) {
    console.log("initial ajaxGetData instance");
    return {
      ajaxGet(url) {
        return $http({
          method: "GET",
          url: url
        });
      }
    };
  })
  .provider("otherProviderData", function () {
    console.log("initial otherProviderData instance");
    this.$get = function () {
      return {
        otherProviderDataKey: "otherProviderDataValue"
      };
    };
  })
  .provider("providerData", function () {
    console.log("initial providerData instance");
    this.$get = function () {
      return {
        providerDataKey: "providerDataValue"
      };
    };
  })
  .config(function ($stateProvider, $urlRouterProvider, $provide, constantParams, $ionicConfigProvider) {
    console.log("start config");

    $provide.provider("provideTest", function () {
      this.$get = function () {
        console.log("initial provideTest instance");
        return {
          testStr: "testValue"
        };
      };
    });

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('tab.category', {
        url: '/category',
        views: {
          'tab-category': {
            templateUrl: 'templates/tab-category.html',
            controller: 'CategoryCtrl'
          }
        }
      })
      .state('tab.find', {
        url: '/find',
        views: {
          'tab-find': {
            templateUrl: 'templates/tab-find.html',
            controller: 'FindCtrl'
          }
        }
      })
      .state('tab.my', {
        url: '/my',
        views: {
          'tab-my': {
            templateUrl: 'templates/tab-my.html',
            controller: 'MyCtrl'
          }
        }
      })
      .state('tab.shoppingcar', {
        url: '/shoppingcar',
        views: {
          'tab-shoppingcar': {
            templateUrl: 'templates/tab-shoppingcar.html',
            controller: 'ShoppingCarCtrl'
          }
        }
      })
      .state('tab.goodsdetail', {
        url: '/goodsdetail',
        views: {
          'tab-home': {
            templateUrl: 'templates/goodsdetail.html',
            controller: 'HomeThematicCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

    // 修改Android的样式
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('')
      .icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('')
      .icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

  });


angular.module('todo', ['ionic']);
