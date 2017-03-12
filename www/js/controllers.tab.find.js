angular.module('starter.controllers.tab.find', [])

.controller('FindCtrl', ["$scope", '$rootScope', "$http", 'getData', 'api', 'stateGo', function ($scope, $rootScope, $http, getData, api, stateGo) {

  // test
  $scope.isLike = false;

  $scope.socialcircleList = [{
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
        },
        {
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

  $scope.currentReplyTarget = {
    id: 0
  };

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

  $scope.toPublish = function () {
    console.log('toPublish');
    stateGo.goToState('socialcircle-publish');
  };

  $scope.toPublishWithImg = function () {
    console.log('toPublishWithImg');
  };

  $scope.replyShortcut = function ($event) {
    console.log('replyShortcut');
    if ($event.stopPropagation) {
      $event.stopPropagation();
    }
    stateGo.goToState();
  };

}])

.controller('SocialcircleDetailCtrl', ['$scope', '$stateParams', 'getData', 'api', '$timeout', function ($scope, $stateParams, getData, api, $timeout) {

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
    ],
    comments: [
      {
        name: 'Ninnka',
        avatar: 'http://v2ex.assets.uxengine.net/gravatar/314258679ae304a33da79c7534a34657?s=73&d=retro',
        locate: '中国·深圳',
        timestamp: '1488009540000',
        comment: '是啊是啊'
      },
      {
        name: 'Hennzr',
        avatar: 'http://v2ex.assets.uxengine.net/gravatar/314258679ae304a33da79c7534a34657?s=73&d=retro',
        locate: '中国·深圳',
        timestamp: '1488009540000',
        comment: '叼叼叼',
      },
      {
        name: 'Rennzh',
        avatar: 'http://v2ex.assets.uxengine.net/gravatar/314258679ae304a33da79c7534a34657?s=73&d=retro',
        locate: '中国·深圳',
        timestamp: '1488009540000',
        comment: '能不能别装逼',
      }
    ]
  };

  $scope.replyInfo = {
    reply: ''
  };

  $scope.getSocialMsg = function () {
    // todo
  };
  $scope.getSocialMsg();

  $scope.getReplyFocus = function ($event) {
    // todo
    console.log('getReplyFocus');
    $timeout(function () {
      document.querySelector('textarea[name=social-reply]').focus();
    }, 1);

  };

  $scope.setLikeSymbol = function (id) {
    // todo
    console.log('setLikeSymbol');
  };

}])

.controller('SocialcircleMyCtrl', ['$scope', 'getData', 'api', function ($scope, getData, api) {

  $scope.getSocialMsg = function () {
    // todo
  };
  $scope.getSocialMsg();

}])

.controller('SocialcirclePublishCtrl', ['$scope', 'getData', 'api', function ($scope, getData, api) {
  $scope.publishInfo = {
    imagesList: [],
    text: ''
  };

  $scope.publishMsg = function () {
    console.log('publishMsg');
    // todo
  };
}]);