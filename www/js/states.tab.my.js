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
        cache: false,
        url: "/my/collections-activity",
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
        cache: false,
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
      .state('my_collections-stadium.used', {
        url: "/used",
        views: {
          'collections-stadium-used': {
            templateUrl: "templates/tab-my/collections/stadium/used.html",
            controller: "myCollectionsStadiumUsedCtrl"
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
        cache: false,
        url: "/my/collections-star",
        views: {
          'index': {
            templateUrl: "templates/tab-my/collections-star.html",
            controller: "myCollectionStarCtrl"
          }
        }
      })
      .state('my_collections-star.activity', {
        url: "/activity",
        views: {
          'collections-star-activity': {
            templateUrl: "templates/tab-my/collections/star/activity.html",
            controller: "myCollectionStarActivityCtrl"
          }
        }
      })
      .state('my_collections-star.stadium', {
        url: "/stadium",
        views: {
          'collections-star-stadium': {
            templateUrl: "templates/tab-my/collections/star/stadium.html",
            controller: "myCollectionStarStadiumCtrl"
          }
        }
      })

      // 我的评价
      .state('my_review', {
        cache: false,
        url: "/my/review",
        views: {
          'index': {
            templateUrl: "templates/tab-my/review.html",
            controller: "myReviewCtrl"
          }
        }
      })
      .state('my_review.review-activity', {
        url: "/review-activity",
        views: {
          'review-activity': {
            templateUrl: "templates/tab-my/review/activity.html",
            controller: "myReviewActivityCtrl"
          }
        }
      })
      .state('my_review.review-stadium', {
        url: "/review-stadium",
        views: {
          'review-stadium': {
            templateUrl: "templates/tab-my/review/stadium.html",
            controller: "myReviewStadiumCtrl"
          }
        }
      })

      // 我的历史
      .state('my_history', {
        cache: false,
        url: "/my/history",
        views: {
          'index': {
            templateUrl: "templates/tab-my/history.html",
            controller: "myHistoryCtrl"
          }
        }
      })

      .state('my_recommend', {
        cache: false,
        url: "/my/recommend",
        views: {
          'index': {
            templateUrl: "templates/tab-my/recommend.html",
            controller: "myRecommendCtrl"
          }
        }
      })

      .state('my_recommend.activity', {
        url: '/activity',
        views: {
          'recommend-activity': {
            templateUrl: "templates/tab-my/recommend/activity.html",
            controller: "myRecommendActivityCtrl"
          }
        }
      })

      .state('my_recommend.stadium', {
        url: '/stadium',
        views: {
          'recommend-stadium': {
            templateUrl: "templates/tab-my/recommend/stadium.html",
            controller: "myRecommendStadiumCtrl"
          }
        }
      })

      // 费用管理
      .state('my_payment', {
        cache: false,
        url: "/my/payment",
        views: {
          'index': {
            templateUrl: "templates/tab-my/payment.html",
            controller: "myPaymentCtrl"
          }
        }
      })
      .state('my_payment.activity', {
        url: "/activity",
        views: {
          'payment-activity': {
            templateUrl: "templates/tab-my/payment/activity.html",
            controller: "myPaymentActivityCtrl"
          }
        }
      })
      .state('my_payment.stadium', {
        url: "/stadium",
        views: {
          'payment-stadium': {
            templateUrl: "templates/tab-my/payment/stadium.html",
            controller: "myPaymentStadiumCtrl"
          }
        }
      })
      .state('my_payment.paid', {
        url: "/paid",
        views: {
          'payment-paid': {
            templateUrl: "templates/tab-my/payment/paid.html",
            controller: "myPaymentPaidCtrl"
          }
        }
      })

      // 推送消息
      .state('my_subscription', {
        cache: false,
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
