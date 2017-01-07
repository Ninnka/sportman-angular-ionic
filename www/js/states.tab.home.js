angular.module('starter.states.tab.home', [])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('goodsdetail', {
      cache: false,
      url: '/detail/goodsdetail/:itemname',
      views: {
        'index': {
          templateUrl: 'templates/common/goodsdetail.html',
          controller: 'HomeGoodsDetailCtrl'
        }
      }
    });

}]);
