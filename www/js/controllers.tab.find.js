angular.module('starter.controllers.tab.find', [])

.controller('FindCtrl', ["$scope", '$rootScope', 'getData', 'api', 'stateGo', '$ionicModal', 'UsrInfoLocal', function ($scope, $rootScope, getData, api, stateGo, $ionicModal, UsrInfoLocal) {
  $ionicModal.fromTemplateUrl('social-reply-shortcut.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.replyShortcutModal = modal;
  }, function (err) {
    console.log('err:', err);
  });
  $scope.$on('$destory', function () {
    $scope.replyShortcutModal.remove();
  });
  $scope.openReplyShortcutModal = function () {
    $scope.replyShortcutModal.show();
  };
  $scope.closeReplyShortcutModal = function () {
    $scope.replyShortcutModal.hide();
  };

  $scope.loadMoreSymbol = true;

  $scope.avatar = UsrInfoLocal.avatar;
  $scope.socialbg = UsrInfoLocal.socialbg;

  $scope.shortcutTargetInfo = {
    id: '',
    name: '',
    avatar: '',
    locate: '',
    timestamp: ''
  };

  $scope.socialcircleList = [];
  $scope.likeSocial = [];

  // 当前需要快速回复的动态消息的信息
  $scope.currentReplyTarget = {
    id: 0
  };

  // 获取动态消息列表
  $scope.getSocialCircleList = function () {
    getData.post(api.socialcircle, {
      id: UsrInfoLocal.id
    }).then(function resolve(res) {
        console.log('res.data:', res.data);
        if (res.data.resultStatus === 'success') {
          $scope.likeSocial = res.data.resultData.socialLike;
          $scope.socialcircleList = res.data.resultData.socialList;
          for(var i = 0; i < $scope.socialcircleList.length; i++) {
            var index = $scope.likeSocial.indexOf($scope.socialcircleList[i].id);
            if(index != -1) {
              console.log('i', i + ' islike');
              $scope.socialcircleList[i].isLike = true;
            }
          }
        } else {
          console.log('发生未知错误');
        }
      }, function reject(err) {
        console.log('err:', err);
      });
  };
  $scope.getSocialCircleList();

  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });

  // 检测是否已标记为喜欢
  $scope.isLike = function (id_social) {
    console.log('isLike id_social', id_social);
    return false;
  };

  // 点击喜欢按钮
  $scope.toggleLike = function ($event, id_socialcircle, isLike) {
    // todo
    if ($event.stopPropagation) {
      $event.stopPropagation();
    }
    if(!isLike) {
      console.log('');
      getData.post(api.socialcircle_addlike, {
        id: UsrInfoLocal.id,
        id_socialcircle: id_socialcircle
      }).then(function resolve (res) {
        console.log('toggleLike add res', res);
        if(res.data.resultStatus == 'success') {
          $scope.likeSocial.push(id_socialcircle);
          for(var i = 0; i < $scope.socialcircleList.length; i++) {
            if($scope.socialcircleList[i].id == id_socialcircle) {
              console.log('i', i + ' islike');
              $scope.socialcircleList[i].isLike = true;
            }
          }
        }
      }, function reject (err) {
        console.log('toggleLike add err', err);
      });
    }else {
      getData.post(api.socialcircle_removelike, {
        id: UsrInfoLocal.id,
        id_socialcircle: id_socialcircle
      }).then(function resolve (res) {
        console.log('toggleLike remove res', res);
        var index = $scope.likeSocial.indexOf(id_socialcircle);
        $scope.likeSocial.splice(index, 1);
        for(var i = 0; i < $scope.socialcircleList.length; i++) {
          if($scope.socialcircleList[i].id == id_socialcircle) {
            console.log('i', i + ' islike');
            $scope.socialcircleList[i].isLike = false;
          }
        }
      }, function reject (err) {
        console.log('toggleLike remove err', err);
      });
    }
  };

  // 查看详细的动态消息
  $scope.viewDetail = function ($event, id) {
    // todo
    if ($event.stopPropagation) {
      $event.stopPropagation();
    }
    stateGo.goToState('socialcircle-detail', {
      id: id
    });
  };

  // 查看自己的动态消息列表
  $scope.viewMy = function ($event) {
    if ($event.stopPropagation) {
      $event.stopPropagation();
    }
    stateGo.goToState('socialcircle-my');
  };

  // 下拉刷新
  $scope.refreshNewData = function () {
    $scope.$broadcast('scroll.refreshComplete');
  };

  // 上拉加载
  $scope.loadMoreData = function () {
    getData.post(api.socialcircle, {
      id: UsrInfoLocal.id
    }).then(function successCallback(res) {
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.socialcircleList = $scope.socialcircleList.concat(res.data.resultData.socialList);
        for(var i = 0; i < $scope.socialcircleList.length; i++) {
          var index = $scope.likeSocial.indexOf($scope.socialcircleList[i].id);
          if(index != -1) {
            console.log('i', i + ' islike');
            $scope.socialcircleList[i].isLike = true;
          }
        }
      }, function errorCallback(err) {
        console.log("err:", err);
      });
  };

  // 点击右上角的发送动态消息
  $scope.toPublish = function () {
    console.log('toPublish');
    stateGo.goToState('socialcircle-publish');
  };

  $scope.toPublishWithImg = function () {
    console.log('toPublishWithImg');
  };

  // 动友圈的快速回复按钮
  $scope.replyShortcut = function ($event, targetObj) {
    console.log('replyShortcut');
    if ($event.stopPropagation) {
      $event.stopPropagation();
    }
    $scope.openReplyShortcutModal();
    // REVIEW:
    $scope.shortcutTargetInfo.id = targetObj.id;
    $scope.shortcutTargetInfo.name = targetObj.name;
    $scope.shortcutTargetInfo.avatar = targetObj.avatar;
    $scope.shortcutTargetInfo.locate = targetObj.locate;
    $scope.shortcutTargetInfo.timestamp = targetObj.timestamp;
  };

  // 关闭快速回复按钮
  $scope.closeShortcut = function ($event) {
    $scope.resetReplyInShortcut();
    $scope.closeReplyShortcutModal();
  };

  // 提交快速回复
  $scope.submitReplyInShortcut = function ($event) {
    if ($event.stopPropagation) {
      $event.stopPropagation();
    }
    // TODO:
  };

  // 重置快速回复对象的信息
  $scope.resetReplyInShortcut = function ($event) {
    if ($event && $event.stopPropagation) {
      $event.stopPropagation();
    }
    // REVIEW:
    $scope.shortcutTargetInfo.id = '';
    $scope.shortcutTargetInfo.name = '';
    $scope.shortcutTargetInfo.avatar = '';
    $scope.shortcutTargetInfo.locate = '';
    $scope.shortcutTargetInfo.timestamp = '';
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
