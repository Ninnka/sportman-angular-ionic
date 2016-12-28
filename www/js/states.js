angular.module('starter.states', [])

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
    })
    .state('signinup', {
      cache: false,
      url: '/signinup',
      views: {
        'index': {
          templateUrl: 'templates/common/signinup.html',
          controller: 'SignInUpCtrl'
        }
      }
    })
    .state('usrdetail', {
      cache: false,
      url: '/usr/detail',
      views: {
        'index': {
          templateUrl: 'templates/usr/detail.html',
          controller: 'usrDetailCtrl'
        }
      }
    })
    .state('usrdetail_phone', {
      cache: false,
      url: '/usr/detail/phone',
      views: {
        'index': {
          templateUrl: 'templates/usr/detail/phone.html',
          controller: ''
        }
      }
    });



}]);
