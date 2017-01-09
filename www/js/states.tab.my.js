angular.module('starter.states.tab.my', [])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider

  // 登录
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

  // 用户详细
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

  // 我的活动
  .state('my_collections-activity', {
      url: "/my/collections-activity",
      // abstract: true,
      views: {
        'index': {
          templateUrl: "templates/tab-my/collections-activity.html",
          controller: "myCollectionsActivityCtrl"
        }
      }
    })
    .state('my_collections-activity.coming', {
      url: "/coming",
      views: {
        'collections-activity-coming': {
          templateUrl: "templates/tab-my/collections/activity/coming.html",
          controller: "myCollectionsActivityComingCtrl"
        }
      }
    })
    .state('my_collections-activity.investigating', {
      url: "/investigating",
      views: {
        'collections-activity-investigating': {
          templateUrl: "templates/tab-my/collections/activity/investigating.html",
          controller: "myCollectionsActivityInvestigatingCtrl"
        }
      }
    })
    .state('my_collections-activity.finished', {
      url: "/finished",
      views: {
        'collections-activity-finished': {
          templateUrl: "templates/tab-my/collections/activity/finished.html",
          controller: "myCollectionsActivityFinishedCtrl"
        }
      }
    })
    .state('my_collections-activity.all', {
      url: "/all",
      views: {
        'collections-activity-all': {
          templateUrl: "templates/tab-my/collections/activity/all.html",
          controller: "myCollectionsActivityAllCtrl"
        }
      }
    })

  // 我的场馆
  .state('my_collections-stadium', {
      url: "/my/collections-stadium",
      // abstract: true,
      views: {
        'index': {
          templateUrl: "templates/tab-my/collections-stadium.html",
          controller: "myCollectionsStadiumCtrl"
        }
      }
    })
    .state('my_collections-stadium.available', {
      url: "/available",
      views: {
        'collections-stadium-available': {
          templateUrl: "templates/tab-my/collections/stadium/available.html",
          controller: "myCollectionsStadiumAvailableCtrl"
        }
      }
    })
    .state('my_collections-stadium.watingpayment', {
      url: "/watingpayment",
      views: {
        'collections-stadium-watingpayment': {
          templateUrl: "templates/tab-my/collections/stadium/watingpayment.html",
          controller: "myCollectionsStadiumWaitingPaymentCtrl"
        }
      }
    })
    .state('my_collections-stadium.expire', {
      url: "/expire",
      views: {
        'collections-stadium-expire': {
          templateUrl: "templates/tab-my/collections/stadium/expire.html",
          controller: "myCollectionsStadiumExpireCtrl"
        }
      }
    })
    .state('my_collections-stadium.all', {
      url: "/all",
      views: {
        'collections-stadium-all': {
          templateUrl: "templates/tab-my/collections/stadium/all.html",
          controller: "myCollectionsStadiumAllCtrl"
        }
      }
    })

  // 我的收藏
  .state('my_collections-star', {
      url: "/my/collections-star",
      views: {
        'index': {
          templateUrl: "templates/tab-my/collections-star.html",
          controller: ""
        }
      }
    })
    .state('my_collections-star.activity', {
      url: "/activity",
      views: {
        'collections-star-activity': {
          templateUrl: "templates/tab-my/collections/star/activity.html",
          controller: ""
        }
      }
    })
    .state('my_collections-star.stadium', {
      url: "/stadium",
      views: {
        'collections-star-stadium': {
          templateUrl: "templates/tab-my/collections/star/stadium.html",
          controller: ""
        }
      }
    })

  // 推送消息
  .state('my_subscription', {
      url: "/my/subscription",
      views: {
        'index': {
          templateUrl: "templates/tab-my/subscription.html",
          controller: "mySubscription"
        }
      }
    })
    .state('my_subscription.activities', {
      url: '/activities',
      views: {
        'subscription-activities': {
          templateUrl: "templates/tab-my/subscription/activities.html",
          controller: "mySubscriptionActivities"
        }
      }
    })
    .state('my_subscription.companies', {
      url: '/companies',
      views: {
        'subscription-companies': {
          templateUrl: "templates/tab-my/subscription/companies.html",
          controller: "mySubscriptionCompanies"
        }
      }
    });



}]);
