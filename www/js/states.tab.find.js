angular.module('starter.states.tab.find', [])

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('socialcircle-detail', {
        cache: false,
        url: '/socialcircle-detail',
        params: {
          id: 0
        },
        views: {
          'index': {
            templateUrl: 'templates/tab-find/socialcircle-detail.html',
            controller: 'SocialcircleDetailCtrl'
          }
        }
      });

  }]);
