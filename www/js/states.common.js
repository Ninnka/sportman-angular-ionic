angular.module('starter.states.common', [])

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider
    .state('review', {
      cache: false,
      url: "/review",
      params: {
        type: "",
        id: 0
      },
      views: {
        'index': {
          templateUrl: "templates/common/review.html",
          controller: "reviewCtrl"
        }
      }
    });
}]);
