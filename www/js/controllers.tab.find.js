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

  $scope.imgPrefix = api.sportman_pic_prefix;

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
    // if ($event.stopPropagation) {
    //   $event.stopPropagation();
    // }
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

  $scope.imgPrefix = api.sportman_pic_prefix;

  $scope.userPartInfo = {
    avatar: UsrInfoLocal.avatar
  }

  $scope.socialcircle = {};
  $scope.socialimgList = [];
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
      $scope.socialcircle = res.data.resultData.socialDetail;
      $scope.socialimgList = res.data.resultData.images;
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
    console.log('id_socialcircle', id_socialcircle);
    console.log('isLike', isLike);
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
          $scope.socialcircle.likecount = $scope.socialcircle.likecount + 1;
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
          $scope.socialcircle.likecount = $scope.socialcircle.likecount - 1;
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
      comment: $scope.replyInfo.reply,
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

  $scope.imgPrefix = api.sportman_pic_prefix;

  $scope.loadMoreData = true;

  $scope.socialcircleList = [];

  // REVIEW:获取我发送的动态消息
  $scope.getMySocialMsg = function () {
    console.log('getMySocialMsg');
    getData.post(api.socialcircle_my, {
      id: UsrInfoLocal.id
    }).then(function resolve(res) {
      console.log('getMySocialMsg res', res);
      if (res.data.resultStatus == 'success') {
        $scope.socialcircleList = $scope.socialcircleList.concat(res.data.resultData.socialList);
      }
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

  $scope.loadMoreData = function () {
    // TODO:
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

}])

.controller('SocialcirclePublishCtrl', ['$scope', 'getData', 'api', 'UsrInfoLocal', '$timeout', '$ionicPopup', function ($scope, getData, api, UsrInfoLocal, $timeout, $ionicPopup) {

  $scope.publishInfo = {
    imagesList: [],
    text: ''
  };

  $scope.resetPublishInfo = function () {
    $scope.publishInfo.imagesList.splice(0, $scope.publishInfo.imagesList.length);
    $scope.publishInfo.text = '';
  };

  $scope.submitPublishMsg = function () {
    console.log('publishMsg');
    $timeout(function () {
      var fd = new FormData();
      fd.append('id_user', UsrInfoLocal.id);
      fd.append('locate', '中国-广东-广州');
      fd.append('text', $scope.publishInfo.text);
      for (var i = 0, file; file = $scope.publishInfo.imagesList[i]; i++) {
        (function (file) {
            fd.append('imgs[]',file);
        })(file);
      }
      $.ajax({
        url: 'http://localhost/sportman/upload_image.php' ,
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res);
            if(res.data.resultStatus == 'success') {
              $scope.showResult('上传成功');
              $scope.resetPublishInfo();
              // TODO:返回上一页
            }else {
              $scope.showResult('上传失败');
            }
        },
        error: function (err) {
            $scope.showResult('网络出错');
            console.log(err);
        }
      });
    }, 1);
  };

  $scope.deleteImageItem = function (index) {
    console.log('deleteImageItem index', index);
    $scope.publishInfo.imagesList.splice(index, 1);
  };

  angular.element('#imginput').on("change", function (e) {
    $timeout(function () {
      var files = e.target.files || e.dataTransfer.files;
      console.log('files', files);
      $scope.publishInfo.imagesList.push(files[0]);
      console.log('$scope.publishInfo.imagesList', $scope.publishInfo.imagesList);
    }, 1);
    // $scope.apply();
  });

  $scope.showResult = function (result) {
    var alertPopup = $ionicPopup.alert({
      title: result,
      template: ''
    });
    alertPopup.then(function (res) {});
  };
}]);
