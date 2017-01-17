angular.module('starter.states.tab.stadium', [])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider

    .state('detail_stadium', {
    cache: false,
    url: '/detail/stadium',
    params: {
      title: "",
      id: 0
    },
    views: {
      'index': {
        templateUrl: 'templates/common/detail/stadium.html',
        controller: 'DetailStadiumCtrl'
      }
    }
  });
}]);
