angular.module('starter.states', [])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('goodsdetail', {
      cache: false,
      url: '/detail/goodsdetail/:itemname',
      views: {
        'index': {
          templateUrl: 'templates/common/goodsdetail.html',
          controller: 'HomeGoodsDetailCtrl'
        }
      }
    })
    .state('signinup', {
      cache: false,
      url: '/signinup',
      views: {
        'index': {
          templateUrl: 'templates/common/signinup.html',
          controller: 'SignInUpCtrl'
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

  // app设置部分
  .state('appsetting', {
      cache: false,
      url: '/app/setting',
      views: {
        "index": {
          templateUrl: "templates/app/setting.html",
          controller: ""
        }
      }
    })
    .state('appsetting_account-security', {
      cache: false,
      url: '/app/setting/account-security',
      views: {
        'index': {
          templateUrl: "templates/app/setting/account-security.html",
          controller: ""
        }
      }
    })
    .state('appsetting_notification', {
      cache: false,
      url: '/app/setting/notification',
      views: {
        'index': {
          templateUrl: "templates/app/setting/notification.html",
          controller: ""
        }
      }
    })
    .state('appsetting_privacy', {
      cache: false,
      url: '/app/setting/privacy',
      views: {
        'index': {
          templateUrl: "templates/app/setting/privacy.html",
          controller: ""
        }
      }
    })
    .state('appsetting_universal', {
      cache: false,
      url: '/app/setting/universal',
      views: {
        'index': {
          templateUrl: "templates/app/settiing/universal.html",
          controller: ""
        }
      }
    })
    .state('appsetting_feedback', {
      cache: false,
      url: '/app/setting/feedback',
      views: {
        'index': {
          templateUrl: "templates/app/setting/feedback.html",
          controller: ""
        }
      }
    })
    .state('appsetting_about', {
      cache: false,
      url: '/app/setting/about',
      views: {
        'index': {
          templateUrl: "templates/app/setting/about.html",
          controller: ""
        }
      }
    })
    .state('appsetting_account-security_password', {
      cache: false,
      url: '/app/setting/account-security/password',
      views: {
        'index': {
          templateUrl: "templates/app/setting/account-security/password.html",
          controller: "settingAccountSecurityPasswordCtrl"
        }
      }
    })
    .state('appsetting_account-security_link-mobile', {
      cache: false,
      url: "/app/setting/account-security/link-mobile",
      views: {
        'index': {
          templateUrl: "templates/app/setting/account-security/link-mobile.html",
          controller: ""
        }
      }
    })
    .state('appsetting_account-security_email', {
      cache: false,
      url: "/app/setting/account-security/email",
      views: {
        'index': {
          templateUrl: "templates/app/setting/account-security/email.html",
          controller: ""
        }
      }
    })
    .state('appsetting_account-security_sportmanid', {
      cache: false,
      url: "/app/setting/account-security/sportmanid",
      views: {
        'index': {
          templateUrl: "templates/app/setting/account-security/sportmanid.html",
          controller: ""
        }
      }
    });

}]);
