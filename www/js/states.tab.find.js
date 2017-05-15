angular.module('starter.states.tab.find', [])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('socialcircle-detail', {
      cache: false,
      url: '/socialcircle-detail',
      params: {
        id_socialcircle: 0
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
  })

  .state('socialcircle-publish', {
    cache: false,
    url: '/socialcircle-publish',
    views: {
      'index': {
        templateUrl: 'templates/tab-social/socialcircle-publish.html',
        controller: 'SocialcirclePublishCtrl'
      }
    }
  });

}]);