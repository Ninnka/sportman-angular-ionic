angular.module('starter.states.tab.activity', [])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
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
    });

}]);
