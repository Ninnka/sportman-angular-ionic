angular.module('starter.controllers', [])
  .controller('HomeCtrl', function ($scope) {

  })
  .controller('CategoryCtrl', function ($scope) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // $scope.chats = Chats.all();
    // $scope.remove = function (chat) {
    //   Chats.remove(chat);
    // };
  })
  .controller('FindCtrl', ["$scope", "$http", "constantParams", "valueParams", "provideTest", "getData", "ajaxGetData", "studentsService", "$timeout", function ($scope, $http, constantParams, valueParams, provideTest, getData, ajaxGetData, studentsService, $timeout) {
    // console.log("constantParams: " + constantParams);
    // console.log("valueParams: " + valueParams);
    $scope.findContentList = $http({
        method: "GET",
        url: "http://www.hehe168.com/mapi.php?act=getGoods"
      })
      .then(function successCallback(res) {
        // console.log("res: ")
        // console.log(res);
        return res;
      }, function errorCallback(err) {
        console.log("err:");
        console.log(err);
        return [];
      });
    $scope.apiurl = "http://www.hehe168.com/mapi.php?act=getGoods";
    $scope.getDataAjax = function () {
      // console.log("getData:");
      // console.log(getData);
      // console.log("provideTest");
      // console.log(provideTest);
      //
      // console.log("modify p1:");
      // getData.p1.pname = "p1_m";
      // console.log("getData_modify:");
      // console.log(getData);

    };
    console.log("getData:");
    console.log(getData);
    console.log("provideTest");
    console.log(provideTest);

    $timeout(function () {
      console.log("modify p1:");
      getData.p1.pname = "p1_m";
      console.log("getData_modify:");
      console.log(getData);
    }, 5000);
    // studentsService.logSTC();
    // console.log("innerThing: " + studentsService.innerThing);
    // studentsService.modifySTC("STC modify");
    // studentsService.modifyInner("inner modify");

  }])
  .controller('ShoppingCarCtrl', ["$scope", "studentsService", "ajaxGetData", "getData", function ($scope, studentsService, ajaxGetData, getData) {
    $scope.getGoodsData = function () {
      studentsService.logSTC();
      console.log("innerThing: " + studentsService.innerThing);
      var data = ajaxGetData.ajaxGet("http://www.hehe168.com/mapi.php?act=getGoods");
      console.log("getData");
      console.log(getData);
    };
  }])
  .controller('MyCtrl', function ($scope) {
    $scope.userinfo = {
      username: "ninnka",
      userlevel: "level6"
    };
    $scope.testToChildScope = "testToChildScopeValue";
  })
  .controller('myDirectiveCtrl', function ($scope, $element, $attrs, $transclude) {
    $scope.collectionCount = "100";
    $scope.historyCount = {
      yesterday: "300",
      today: "200"
    };
    $scope.showvalue = function () {
      console.log("showvalue: " + $scope.value);
    };
    // console.log("myDirectiveCtrl userinfo.username: " + $scope.userinfo.username);
  });
// .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })
