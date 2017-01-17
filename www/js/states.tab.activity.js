angular.module('starter.states.tab.activity', [])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('city-selection', {
      cache: false,
      url: '/city-selection',
      views: {
        'index': {
          templateUrl: "templates/common/city-selection.html",
          controller: "citySelectionCtrl"
        }
      }
    })
    .state('detail_activity', {
      cache: false,
      url: '/detail/activity',
      params: {
        title: "",
        id: 0
      },
      views: {
        'index': {
          templateUrl: 'templates/common/detail/activity.html',
          controller: 'DetailActivityCtrl'
        }
      }
    })
    .state('registration-instruction', {
      cache: false,
      url: '/registration/instruction',
      views: {
        'index': {
          templateUrl: 'templates/tab-home/register/instruction.html',
          controller: ''
        }
      }
    })
    .state('registration-information', {
      cache: false,
      url: '/registration/information',
      views: {
        'index': {
          templateUrl: 'templates/tab-home/register/information.html',
          controller: ''
        }
      }
    })
    .state('registration-complete', {
      cache: false,
      url: '/registration/complete',
      views: {
        'index': {
          templateUrl: 'templates/tab-home/register/complete.html',
          controller: 'RegistrationCompleteCtrl'
        }
      }
    });

}]);
