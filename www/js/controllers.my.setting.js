angular.module('starter.controllers.my.setting', [])

// 密码部分
.controller('settingAccountSecurityPasswordCtrl', ['$scope', 'UsrInfoLocal', function ($scope, UsrInfoLocal) {
  console.log("init settingAccountSecurityPasswordCtrl");
  $scope.uil = UsrInfoLocal;

  $scope.passwordModify = {
    enterPW: "",
    confirmPW: "",
    compare: function () {
      if (this.enterPW === this.confirmPW) {
        return true;
      }
      return false;

    }
  };

  $scope.resetInput = function () {
    $scope.passwordModify.enterPW = "";
    $scope.passwordModify.confirmPW = "";
  };

  $scope.submitInput = function () {
    console.log($scope.passwordModify.enterPW);
    if ($scope.passwordModify.compare()) {
      console.log("提交成功");
    } else {
      console.log("密码不一致");
    }
  };

}])

// 手机检测绑定
.controller('settingLinkMobileCtrl', ['$scope', "ls", function ($scope, ls) {

  $scope.mobileInfo = {
    phonenumber: ls.get("phonenumber", "")
  };

  $scope.bindSymbol = {
    hasBind: $scope.mobileInfo.phonenumber !== "",
    noBind: $scope.mobileInfo.phonenumber === ""
  };

  // 监听页面进入事件
  // $scope.$on("$ionicView.enter", function () {
  //
  // });

  $scope.bindMobile = function () {

  };

  $scope.changeMobile = function () {

  };
}])

// 绑定手机
.controller('settingBindMobileCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {

  $scope.bindmobile = {
    phonenumber: ""
  };

  $scope.resetInput = function () {
    $scope.bindmobile.phonenumber = "";
  };

  $scope.nextStep = function () {
    $state.go("appsetting_account-security_link-mobile_validatemobile");
    $rootScope.inAnimation();
  };
}])

// 更换手机
.controller('settingChangeMobileCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
  $scope.bindmobile = {
    phonenumber: ""
  };

  $scope.resetInput = function () {
    $scope.bindmobile.phonenumber = "";
  };

  $scope.nextStep = function () {
    $state.go("appsetting_account-security_link-mobile_validatemobile");
    $rootScope.inAnimation();
  };
}])

// 认证手机
.controller('settingValidateMobileCtrl', ['$scope', function ($scope) {

}])

// 更新邮箱
.controller('settingUpdateEmail', ['$scope', 'UsrInfoLocal', function ($scope, UsrInfoLocal) {

  $scope.bindSymbol = {
    hasBind: UsrInfoLocal.email !== ""
  };

  $scope.bindEmail = {
    email: ""
  };

  $scope.resetInput = function () {
    $scope.bindEmail.email = "";
  };

  $scope.updateEmail = function () {
    console.log("submit email");
  };

}])

// 更新id
.controller('settingUpdateSportmanid', ['$scope', 'UsrInfoLocal', function ($scope, UsrInfoLocal) {

  $scope.bindSymbol = {
    hasBind: UsrInfoLocal.sportmanid !== ""
  };

  $scope.idPlaceholder = $scope.bindSymbol.hasBind ? UsrInfoLocal.sportmanid : "6-20个字母、数字、下划线和减号，必须以字母开头";

  $scope.bindSportmanid = {
    sportmanid: ""
  };

  $scope.resetInput = function () {
    $scope.bindSportmanid.sportmanid = "";
  };

  $scope.updateId = function () {
    console.log("updateId");
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
.controller('settingAboutCtrl', ['$scope', function ($scope) {

}]);

/**
 * 设置部分
 * ----------------------------------------------------------------------------------------------------------------
 */
