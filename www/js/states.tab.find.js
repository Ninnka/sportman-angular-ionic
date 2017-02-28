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
            templateUrl: 'templates/tab-social/socialcircle-detail.html',
            controller: 'SocialcircleDetailCtrl'
          }
        }
      })

      .state('socialcircle-my', {
        cache: false,
        url: '/socialcircle-my',
        views: {
          'index': {
            templateUrl: 'templates/tab-social/socialcircle-my.html',
            controller: 'SocialcircleMyCtrl'
          }
        }
      });

  }]);
