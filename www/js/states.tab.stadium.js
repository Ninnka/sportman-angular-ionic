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
    })
    .state('detail_stadium_book-list', {
      cache: false,
      url: '/detail/stadium/book-list',
      params: {
        id: 0,
        type: ""
      },
      views: {
        'index': {
          templateUrl: 'templates/tab-stadium/book-list.html',
          controller: "BooklistStadiumCtrl"
        }
      }
    })
    .state('detail_stadium_book-select', {
      cache: false,
      url: '/detail/stadium/book-select',
      params: {
        id: 0,
        type: ""
      },
      views: {
        'index': {
          templateUrl: 'templates/tab-stadium/book-select.html',
          controller: "BookselectStadiumCtrl"
        }
      }
    });
}]);
