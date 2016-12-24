// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services', 'ngAnimate'])
  .run(function ($ionicPlatform) {
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
    })
    .state('goodsdetail', {
      cache: false,
      url: '/detail/goodsdetail/:itemname',
      views: {
        'index': {
          templateUrl: 'templates/goodsdetail.html',
          controller: 'HomeGoodsDetailCtrl'
        }
      }
    })
    .state('usrdetail', {
      cache: false,
      url: '/usr/detail',
      views: {
        'index': {
          templateUrl: 'templates/usr/detail.html',
          controller: 'usrDetailCtrl'
        }
      }
    })
    .state('usrdetail_phone', {
      cache: false,
      url: '/usr/detail/phone',
      views: {
        'index': {
          templateUrl: 'templates/usr/detail/phone.html',
          controller: ''
        }
      }
    })
    .state('appsetting', {
      cache: false,
      url: '/app/setting',
      views: {
        "index": {
          templateUrl: "templates/app/setting.html",
          controller: ""
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
