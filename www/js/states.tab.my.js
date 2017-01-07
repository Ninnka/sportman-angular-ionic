angular.module('starter.states.tab.my', [])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
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
    }).state('my_subscription', {
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
