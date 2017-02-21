angular.module('starter.controllers.my.setting', ['ionic'])

  // 密码部分
  .controller('settingAccountSecurityPasswordCtrl', ['$scope', '$ionicPopup', 'UsrInfoLocal', 'getData', 'api', 'ls', function ($scope, $ionicPopup, UsrInfoLocal, getData, api, ls) {
    console.log("init settingAccountSecurityPasswordCtrl");
    $scope.uil = UsrInfoLocal;

    $scope.passwordModify = {
      enterPW: '',
      confirmPW: '',
      compare: function () {
        if (this.enterPW === this.confirmPW) {
          return true;
        }
        return false;

      }
    };

    $scope.resetInput = function () {
      $scope.passwordModify.enterPW = '';
      $scope.passwordModify.confirmPW = '';
    };

    $scope.submitInput = function () {
      console.log($scope.passwordModify.enterPW);
      if ($scope.passwordModify.compare()) {
        getData.post(api.setting_changepassword, {
          id: UsrInfoLocal.id,
          password: $scope.passwordModify.enterPW
        }).then(function resolve(res) {
          ls.set('usrpassword', $scope.passwordModify.enterPW);
          $scope.showResult(res.data.resultData);
        }, function reject(err) {
          console.log(err);
          $scope.showResult('发生未知错误，修改失败');
        });
      } else {
        alert('密码不一致');
      }
    };

    $scope.showResult = function (result) {
      var alertPopup = $ionicPopup.alert({
        title: result,
        template: ''
      });
      alertPopup.then(function (res) {});
    };
  }])

  // 手机检测绑定
  .controller('settingLinkMobileCtrl', ['$scope', '$ionicPopup', 'getData', 'api', 'UsrInfoLocal', "ls", 'stateGo', function ($scope, $ionicPopup, getData, api, UsrInfoLocal, ls, stateGo) {

    $scope.mobileInfo = {
      phonenumber: ls.get('phonenumber', '')
    };

    $scope.bindSymbol = {
      hasBind: $scope.mobileInfo.phonenumber !== '',
      noBind: $scope.mobileInfo.phonenumber === ''
    };

    // 监听页面进入事件
    // $scope.$on("$ionicView.enter", function () {
    //
    // });

    $scope.cancelBindMobile = function () {
      getData.post(api.setting_changemobile, {
        id: UsrInfoLocal.id,
        mobile: '',
        type: 'unbind'
      }).then(function (res) {
        $scope.showResult(res.data.resultStatus === 'success' ? '修改成功' : '修改失败');
        if (res.data.resultStatus === 'success') {
          ls.set('phonenumber', '');
          UsrInfoLocal.setPn('');
          stateGo.goToBack();
        }
      }, function reject(err) {
        $scope.showResult('发生未知错误，解除绑定失败');
      });
    };

    $scope.showResult = function (result) {
      var alertPopup = $ionicPopup.alert({
        title: result,
        template: ''
      });
      alertPopup.then(function (res) {});
    };
  }])

  // 绑定手机
  .controller('settingBindMobileCtrl', ['$scope', '$rootScope', 'stateGo', function ($scope, $rootScope, stateGo) {

    $scope.bindmobile = {
      phonenumber: ''
    };

    $scope.resetInput = function () {
      $scope.bindmobile.phonenumber = '';
    };

    $scope.nextStep = function () {
      stateGo.goToState('appsetting_account-security_link-mobile_validatemobile', {
        mobile: $scope.bindmobile.phonenumber
      });
    };
  }])

  // 更换手机
  .controller('settingChangeMobileCtrl', ['$scope', '$rootScope', 'stateGo', function ($scope, $rootScope, stateGo) {
    $scope.bindmobile = {
      phonenumber: ''
    };

    $scope.resetInput = function () {
      $scope.bindmobile.phonenumber = '';
    };

    $scope.nextStep = function () {
      stateGo.goToState('appsetting_account-security_link-mobile_validatemobile', {
        mobile: $scope.bindmobile.phonenumber
      });
    };
  }])

  // 认证手机
  .controller('settingValidateMobileCtrl', ['$scope', '$stateParams', '$ionicPopup', 'stateGo', 'getData', 'api', 'UsrInfoLocal', 'ls', function ($scope, $stateParams, $ionicPopup, stateGo, getData, api, UsrInfoLocal, ls) {

    $scope.mobile = $stateParams.mobile;

    $scope.bindMobile = function () {
      console.log($scope.mobile);
      getData.post(api.setting_changemobile, {
        id: UsrInfoLocal.id,
        mobile: $scope.mobile,
        type: 'bind'
      }).then(function resolve(res) {
        $scope.showResult(res.data.resultStatus === 'success' ? '修改成功' : '修改失败');
        if (res.data.resultStatus === 'success') {
          ls.set('phonenumber', $scope.mobile);
          UsrInfoLocal.setPn($scope.mobile);
          stateGo.goToBack({
            step: -2
          });
        }
      }, function reject(err) {
        $scope.showResult('发生未知错误，绑定失败');
      });
    };

    $scope.showResult = function (result) {
      var alertPopup = $ionicPopup.alert({
        title: result,
        template: ''
      });
      alertPopup.then(function (res) {});
    };

  }])

  // 更新邮箱
  .controller('settingUpdateEmail', ['$scope', '$ionicPopup', 'stateGo', 'getData', 'api', 'UsrInfoLocal', 'ls', function ($scope, $ionicPopup, stateGo, getData, api, UsrInfoLocal, ls) {

    $scope.bindSymbol = {
      hasBind: UsrInfoLocal.email !== ''
    };

    $scope.bindEmail = {
      email: ''
    };

    $scope.resetInput = function () {
      $scope.bindEmail.email = '';
    };

    $scope.updateEmail = function () {
      getData.post(api.setting_email, {
        id: UsrInfoLocal.id,
        email: $scope.bindEmail.email
      }).then(function resolve(res) {
        $scope.showResult(res.data.resultStatus === 'success' ? '邮箱地址更换成功' : '邮箱地址更换失败');
        if (res.data.resultStatus === 'success') {
          ls.set('email', $scope.bindEmail.email);
          UsrInfoLocal.setEmail($scope.bindEmail.email);
          stateGo.goToBack({
            step: -1
          });
        }
      }, function reject(err) {
        $scope.showResult('更换失败', '发生未知错误');
      });
    };

    $scope.showResult = function (result, reason) {
      var alertPopup = $ionicPopup.alert({
        title: result,
        template: reason
      });
      alertPopup.then(function (res) {});
    };

  }])

  // 更新id
  .controller('settingUpdateSportmanid', ['$scope', '$ionicPopup', 'stateGo', 'getData', 'api', 'UsrInfoLocal', 'ls', function ($scope, $ionicPopup, stateGo, getData, api, UsrInfoLocal, ls) {

    $scope.bindSymbol = {
      hasBind: UsrInfoLocal.sportmanid !== ''
    };

    $scope.idPlaceholder = $scope.bindSymbol.hasBind ? UsrInfoLocal.sportmanid : '6-20个字母、数字、下划线和减号，必须以字母开头';

    $scope.bindSportmanid = {
      sportmanid: ''
    };

    $scope.resetInput = function () {
      $scope.bindSportmanid.sportmanid = '';
    };

    $scope.updateId = function () {
      getData.post(api.setting_sportmanid, {
        id: UsrInfoLocal.id,
        sportmanid: $scope.bindSportmanid.sportmanid
      }).then(function resolve(res) {
        $scope.showResult(res.data.resultStatus === 'success' ? '绑定ID成功' : '绑定ID失败');
        if (res.data.resultStatus === 'success') {
          ls.set('sportmanid', $scope.bindSportmanid.sportmanid);
          UsrInfoLocal.setSpmid($scope.bindSportmanid.sportmanid);
          stateGo.goToBack({
            step: -1
          });
        }
      }, function reject(err) {
        $scope.showResult('绑定失败', '发生未知错误');
      });
    };

    $scope.showResult = function (result, reason) {
      var alertPopup = $ionicPopup.alert({
        title: result,
        template: reason
      });
      alertPopup.then(function (res) {});
    };
  }])

  // 系统通知
  .controller('settingNotificationCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {

  }])

  // 隐私
  .controller('settingPrivacyCtrl', ['$scope', function ($scope) {

  }])

  // 通用设置
  .controller('settingUniversalCtrl', ['$scope', function ($scope) {

  }])

  // 反馈
  .controller('settingFeedbackCtrl', ['$scope', function ($scope) {

  }])

  // 关于
  .controller('settingAboutCtrl', ['$scope', '$ionicLoading', '$ionicPopup', '$timeout', function ($scope, $ionicLoading, $ionicPopup, $timeout) {

    $scope.showResult = function (result, reason) {
      var alertPopup = $ionicPopup.alert({
        title: result,
        template: reason
      });
      alertPopup.then(function (res) {});
    };

    $scope.checkVersion = function () {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      $timeout(function () {
        $ionicLoading.hide();
        $scope.showResult('已经是最新版本');
      }, 2000);
    };
  }]);
