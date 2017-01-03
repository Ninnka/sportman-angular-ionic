// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services', 'starter.filters', 'starter.states', 'starter.states.my.setting', 'ngAnimate', 'ngCordova'])
  .run(function ($ionicPlatform, $cordovaStatusbar) {
    // console.log("run before ionicPlatform ready");
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

      $cordovaStatusbar.overlaysWebView(true);

      // 样式: 无 : 0, 白色不透明: 1, 黑色半透明: 2, 黑色不透明: 3
      $cordovaStatusbar.style(1);

      // 背景颜色名字 : black, darkGray, lightGray, white, gray, red, green,
      // blue, cyan, yellow, magenta, orange, purple, brown 注:需要开启状态栏占用视图.
      // $cordovaStatusbar.styleColor('red');

      $cordovaStatusbar.styleHex('#FB8041');

      // $cordovaStatusbar.hide();

      $cordovaStatusbar.show();

      // var isVisible = $cordovaStatusbar.isVisible();
    });

  })

.constant("constantParams", "constantParams value")

.value("valueParams", "valueParams value")

.config(['$stateProvider', '$urlRouterProvider', '$provide', 'constantParams', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $provide, constantParams, $ionicConfigProvider) {

  $provide.provider("provideTest", function () {
    this.$get = function () {
      console.log("initial provideTest instance");
      return {
        testStr: "testValue"
      };
    };
  });

  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      views: {
        'index': {
          templateUrl: 'templates/tabs.html'
        }
      }
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
    });

  // 默认跳转到tab/home页面
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

  $ionicConfigProvider.views.maxCache(15);

}]);
