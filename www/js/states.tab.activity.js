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
        url: '/detail/activity',
        params: {
          type: "",
          id_activity: 0
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
        params: {
          type: "",
          id_activity: 0
        },
        views: {
          'index': {
            templateUrl: 'templates/tab-activity/register/instruction.html',
            controller: 'RegistrationInstructionCtrl'
          }
        }
      })
      .state('registration-information', {
        cache: false,
        url: '/registration/information',
        params: {
          type: "",
          id_activity: 0
        },
        views: {
          'index': {
            templateUrl: 'templates/tab-activity/register/information.html',
            controller: 'RegistrationInformationCtrl'
          }
        }
      })
      .state('registration-complete', {
        cache: false,
        url: '/registration/complete',
        params: {
          type: "",
          id_activity: 0
        },
        views: {
          'index': {
            templateUrl: 'templates/tab-activity/register/complete.html',
            controller: 'RegistrationCompleteCtrl'
          }
        }
      });

}]);
