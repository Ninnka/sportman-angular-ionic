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
    })
    .state('search', {
      cache: false,
      url: "/search",
      views: {
        'index': {
          templateUrl: "templates/common/search.html",
          controller: "searchCtrl"
        }
      }
    })
    .state('prepare-pay', {
      cache: false,
      url: "/prepare-pay",
      views: {
        'index': {
          templateUrl: "templates/common/prepare-pay.html",
          controller: "preparePayCtrl"
        }
      }
    })
    .state('reviews', {
      cache: false,
      url: '/reviews',
      params: {
        type: "",
        id: 0
      },
      views: {
        'index': {
          templateUrl: "templates/common/reviews.html",
          controller: "reviewsCtrl"
        }
      }
    });
}]);
