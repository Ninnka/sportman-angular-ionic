angular.module('starter.states.my.setting', [])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
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
      url: '/app/setting/notification',
      abstract: true,
      views: {
        'index': {
          templateUrl: "templates/app/setting/notification.html",
          controller: "settingNotification"
        }
      }
    })
    .state('appsetting_notification.activities', {
      url: '/activities',
      views: {
        'notification-activities': {
          templateUrl: "templates/app/setting/notification/activities.html",
          controller: "settingNotificationActivities"
        }
      }
    })
    .state('appsetting_notification.companies', {
      url: '/companies',
      views: {
        'notification-companies': {
          templateUrl: "templates/app/setting/notification/companies.html",
          controller: "settingNotificationCompanies"
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
          templateUrl: "templates/app/setting/universal.html",
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
          controller: "settingLinkMobileCtrl"
        }
      }
    })
    .state('appsetting_account-security_email', {
      cache: false,
      url: "/app/setting/account-security/email",
      views: {
        'index': {
          templateUrl: "templates/app/setting/account-security/email.html",
          controller: "settingUpdateEmail"
        }
      }
    })
    .state('appsetting_account-security_sportmanid', {
      cache: false,
      url: "/app/setting/account-security/sportmanid",
      views: {
        'index': {
          templateUrl: "templates/app/setting/account-security/sportmanid.html",
          controller: "settingUpdateSportmanid"
        }
      }
    })
    .state('appsetting_account-security_link-mobile_bindmobile', {
      cache: false,
      url: "/app/setting/account-security/link-mobile/bindmobile",
      views: {
        'index': {
          templateUrl: "templates/app/setting/account-security/link-mobile/bindmobile.html",
          controller: "settingBindMobileCtrl"
        }
      }
    })
    .state('appsetting_account-security_link-mobile_changemobile', {
      cache: false,
      url: "/app/setting/account-security/link-mobile/changemobile",
      views: {
        'index': {
          templateUrl: "templates/app/setting/account-security/link-mobile/changemobile.html",
          controller: "settingChangeMobileCtrl"
        }
      }
    })
    .state('appsetting_account-security_link-mobile_validatemobile', {
      cache: false,
      url: "/app/setting/account-security/link-mobile/validatemobile",
      views: {
        'index': {
          templateUrl: "templates/app/setting/account-security/link-mobile/validatemobile.html",
          controller: ""
        }
      }
    });
}]);
