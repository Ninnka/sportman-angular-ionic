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
    id: 0,
    comment: ''
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

  // REVIEW:查看详细的动态消息
  $scope.viewDetail = function ($event, id_socialcircle) {
    if ($event.stopPropagation) {
      $event.stopPropagation();
    }
    stateGo.goToState('socialcircle-detail', {
      id_socialcircle: id_socialcircle
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

  // 动友圈的快速回复按钮
  $scope.replyShortcut = function ($event, targetObj) {
    console.log('replyShortcut');
    if ($event.stopPropagation) {
      $event.stopPropagation();
    }
    $scope.openReplyShortcutModal();
    // REVIEW:
    $scope.currentReplyTarget.id = targetObj.id;
    // $scope.shortcutTargetInfo.id = targetObj.id;
    // $scope.shortcutTargetInfo.name = targetObj.name;
    // $scope.shortcutTargetInfo.avatar = targetObj.avatar;
    // $scope.shortcutTargetInfo.locate = targetObj.locate;
    // $scope.shortcutTargetInfo.timestamp = targetObj.timestamp;
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
    // TODO: 获取地点
    getData.post(api.socialcircle_addcomment, {
      id: UsrInfoLocal.id,
      id_socialcircle: $scope.currentReplyTarget.id,
      comment: $scope.currentReplyTarget.comment,
      locate: '中国'
    }).then(function resolve(res) {
      console.log('submitReplyInShortcut res', res);
      $scope.resetReplyInShortcut();
      $scope.closeShortcut();
    }, function reject(err) {
      console.log('submitReplyInShortcut err', err);
    });
  };

  // 重置快速回复对象的信息
  $scope.resetReplyInShortcut = function ($event) {
    if ($event && $event.stopPropagation) {
      $event.stopPropagation();
    }
    // REVIEW:
    $scope.currentReplyTarget.id = 0;
    $scope.currentReplyTarget.comment = '';
    // $scope.shortcutTargetInfo.id = '';
    // $scope.shortcutTargetInfo.name = '';
    // $scope.shortcutTargetInfo.avatar = '';
    // $scope.shortcutTargetInfo.locate = '';
    // $scope.shortcutTargetInfo.timestamp = '';
  };

  // 点击右上角的发送动态消息
  $scope.toPublish = function () {
    console.log('toPublish');
    stateGo.goToState('socialcircle-publish');
  };

  $scope.toPublishWithImg = function () {
    console.log('toPublishWithImg');
  };

}])

.controller('SocialcircleDetailCtrl', ['$scope', '$stateParams', 'getData', 'api', '$timeout', 'UsrInfoLocal', function ($scope, $stateParams, getData, api, $timeout, UsrInfoLocal) {

  $scope.id_socialcircle = $stateParams.id_socialcircle;

  $scope.pageNum = 1;
  $scope.pageSize = 6;

  $scope.socialcircle = {
    // name: 'Ninnka',
    // avatar: 'http://v2ex.assets.uxengine.net/gravatar/314258679ae304a33da79c7534a34657?s=73&d=retro',
    // locate: '中国·深圳',
    // timestamp: '1488009540000',
    // publish: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ellit anim id est laborum. labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ellit anim id est laborum.',
    // likecount: 11,
    // commentcount: 99,
    // images: [
    //   {
    //     id: 1,
    //     imgsrc: 'img/social-imglist-1.png'
    //   }
    // ],
    // comments: [
    //   {
    //     name: 'Ninnka',
    //     avatar: 'http://v2ex.assets.uxengine.net/gravatar/314258679ae304a33da79c7534a34657?s=73&d=retro',
    //     locate: '中国·深圳',
    //     timestamp: '1488009540000',
    //     comment: '是啊是啊'
    //   },
    //   {
    //     name: 'Hennzr',
    //     avatar: 'http://v2ex.assets.uxengine.net/gravatar/314258679ae304a33da79c7534a34657?s=73&d=retro',
    //     locate: '中国·深圳',
    //     timestamp: '1488009540000',
    //     comment: '叼叼叼',
    //   },
    //   {
    //     name: 'Rennzh',
    //     avatar: 'http://v2ex.assets.uxengine.net/gravatar/314258679ae304a33da79c7534a34657?s=73&d=retro',
    //     locate: '中国·深圳',
    //     timestamp: '1488009540000',
    //     comment: '能不能别装逼',
    //   }
    // ]
  };
  $scope.socialcomment = [];

  $scope.replyInfo = {
    reply: ''
  };

  // REVIEW:获取详细的动态消息
  $scope.getSocialMsg = function () {
    getData.post(api.socialcircle_detail, {
      id: UsrInfoLocal.id,
      id_socialcircle: $scope.id_socialcircle
    }).then(function resolve (res) {
      console.log('getSocialMsg res', res);
      $scope.socialcircle = res.data.resultData;
    }, function reject(err) {
      console.log('getSocialMsg err', err);
    });
  };
  $scope.getSocialMsg();

  // REVIEW:获取评论列表
  $scope.getSocialComment = function () {
    getData.post(api.socialcircle_detailcomment, {
      id: UsrInfoLocal.id,
      id_socialcircle: $scope.id_socialcircle,
      pageNum: $scope.pageNum,
      pageSize: $scope.pageSize
    }).then(function resolve (res) {
      console.log('getSocialComment res', res);
      if (res.data.resultStatus == 'success') {
        $scope.socialcomment = $scope.socialcomment.concat(res.data.resultData.comments);
        $scope.pageNum = $scope.pageNum + 1;
      }
    }, function reject (err) {
      console.log('getSocialComment err', err);
    });
  };
  $scope.getSocialComment();

  // REVIEW:使输入框获取焦点
  $scope.getReplyFocus = function ($event) {
    // todo
    console.log('getReplyFocus');
    $timeout(function () {
      document.querySelector('textarea[name=social-reply]').focus();
    }, 1);

  };

  // REVIEW:标记为喜欢 
  $scope.toggleLike = function ($event, id_socialcircle, isLike) {
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
          $scope.socialcircle.isLike = true;
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
        if(res.data.resultStatus == 'success') {
          $scope.socialcircle.isLike = false;
        }
      }, function reject (err) {
        console.log('toggleLike remove err', err);
      });
    }
  };

  // REVIEW:提交回复
  $scope.submitReplyInDetail = function ($event) {
    if ($event.stopPropagation) {
      $event.stopPropagation();
    }
    getData.post(api.socialcircle_addcomment, {
      id: UsrInfoLocal.id,
      id_socialcircle: $scope.id_socialcircle,
      comment: $scope.replyInfo,
      locate: '中国'
    }).then(function resolve(res) {
      console.log('submitReplyInDetail res', res);
      if (res.data.resultStatus == 'success') {
        $scope.replyInfo = '';
      }
    }, function reject(err) {
      console.log('submitReplyInDetail err', err);
    });
  };

  // TODO:上拉加载更多评论
  $scope.loadMoreData = function () {

  };

}])

.controller('SocialcircleMyCtrl', ['$scope', 'getData', 'api', 'UsrInfoLocal', 'stateGo', function ($scope, getData, api, UsrInfoLocal, stateGo) {

  $scope.socialcircle = {};

  // REVIEW:获取我发送的动态消息
  $scope.getMySocialMsg = function () {
    console.log('getMySocialMsg');
    getData.post(api.socialcircle_my, {
      id: UsrInfoLocal.id
    }).then(function resolve(res) {
      console.log('getMySocialMsg res', res);
    }, function reject(err) {
      console.log('getMySocialMsg err', err);
    });
  };
  $scope.getMySocialMsg();

  $scope.viewDetail = function ($event, id_socialcircle) {
    console.log('viewDetail');
    if ($event.stopPropagation) {
      $event.stopPropagation();
    }
    stateGo.goToState('socialcircle-detail', {
      id_socialcircle: id_socialcircle
    });
  };

}])

.controller('SocialcirclePublishCtrl', ['$scope', 'getData', 'api', 'UsrInfoLocal', function ($scope, getData, api, UsrInfoLocal) {
  $scope.publishInfo = {
    imagesList: [],
    text: ''
  };

  $scope.publishMsg = function () {
    console.log('publishMsg');
    // todo
  };
}]);
