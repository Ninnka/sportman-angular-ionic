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
    .state('search-activity', {
      cache: false,
      url: "/search/activity",
      views: {
        'index': {
          templateUrl: "templates/common/search/activity.html",
          controller: "searchActivityCtrl"
        }
      }
    })
    .state('search-stadium', {
      cache: false,
      url: '/search/stadium',
      views: {
        'index': {
          templateUrl: "templates/common/search/stadium.html",
          controller: "searchStadiumCtrl"
        }
      }
    })
    .state('prepare-pay', {
      cache: false,
      url: "/prepare-pay",
      params: {
        type: "",
        id: 0,
        selectMount: 1,
        unitprice: 0
      },
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
