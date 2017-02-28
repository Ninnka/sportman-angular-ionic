angular.module('starter.controllers.tab.find', [])

  .controller('FindCtrl', ["$scope", '$rootScope', "$http", 'getData', 'api', 'stateGo', function ($scope, $rootScope, $http, getData, api, stateGo) {

    // test
    $scope.isLike = false;

    $scope.socialcircleList = [
      {
        name: '小贝',
        avatar: 'http://v2ex.assets.uxengine.net/gravatar/c9cf6e472f42d0ab51134d2c5dbd3a15?s=73&d=retro',
        locate: '英国·伦敦',
        timestamp: '1485309540000',
        publish: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ellit anim id est laborum. labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ellit anim id est laborum.',
        likecount: 11,
        commentcount: 99,
        images: [
          {
            id: 1,
            imgsrc: 'img/social-imglist-1.png'
          },
          {
            id: 1,
            imgsrc: 'img/social-imglist-1.png'
          },
          {
            id: 1,
            imgsrc: 'img/social-imglist-1.png'
          }, {
            id: 1,
            imgsrc: 'img/social-imglist-1.png'
          }
        ]
      },
      {
        name: 'Ninnka',
        avatar: 'http://v2ex.assets.uxengine.net/gravatar/314258679ae304a33da79c7534a34657?s=73&d=retro',
        locate: '中国·深圳',
        timestamp: '1488009540000',
        publish: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ellit anim id est laborum. labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ellit anim id est laborum.',
        likecount: 11,
        commentcount: 99,
        images: [
          {
            id: 1,
            imgsrc: 'img/social-imglist-1.png'
          }
        ]
      }
    ];

    $scope.getSocialCircleList = function () {
      // todo
    };
    $scope.getSocialCircleList();

    $scope.$on("$ionicView.enter", function () {
      $rootScope.clearHistory();
    });

    $scope.toggleLike = function ($event, id) {
      // todo
      if ($event.stopPropagation) {
        $event.stopPropagation();
      }
      $scope.isLike = !$scope.isLike;
    };

    $scope.viewDetail = function ($event, id) {
      // todo
      if ($event.stopPropagation) {
        $event.stopPropagation();
      }
      stateGo.goToState('socialcircle-detail', {
        id: id
      });
    };

    $scope.viewMy = function ($event) {
      if ($event.stopPropagation) {
        $event.stopPropagation();
      }
      stateGo.goToState('socialcircle-my');
    };

  }])

  .controller('SocialcircleDetailCtrl', ['$scope', '$stateParams', 'getData', 'api', function ($scope, $stateParams, getData, api) {

    $scope.socialMsgId = $stateParams.id;

    $scope.socialcircle = {
      name: 'Ninnka',
      avatar: 'http://v2ex.assets.uxengine.net/gravatar/314258679ae304a33da79c7534a34657?s=73&d=retro',
      locate: '中国·深圳',
      timestamp: '1488009540000',
      publish: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ellit anim id est laborum. labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ellit anim id est laborum.',
      likecount: 11,
      commentcount: 99,
      images: [
        {
          id: 1,
          imgsrc: 'img/social-imglist-1.png'
        }
      ]
    };

    $scope.getSocialMsg = function () {
      // todo
    };
    $scope.getSocialMsg();

  }])

  .controller('ScocialcircleMyCtrl', ['$scope', 'getData', 'api', function ($scope, getData, api) {

    $scope.getSocialMsg = function () {
      // todo
    };
    $scope.getSocialMsg();

  }])

  .controller('SocialcircleMyCtrl', ['$scope', 'getData', 'api', 'stateGo', function ($scope, getData, api, stateGo) {

  }]);
