angular.module('starter.controllers.tab.find', [])

// 发现页面的控制器
.controller('FindCtrl', ["$scope", '$rootScope', "$http", "constantParams", "valueParams", "provideTest", "getData", "studentsService", "$timeout", function ($scope, $rootScope, $http, constantParams, valueParams, provideTest, getData,  studentsService, $timeout) {

  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });

  // 测试用，可删除
  // console.log("constantParams: " + constantParams);
  // console.log("valueParams: " + valueParams);
  // $scope.findContentList = $http({
  //     method: "GET",
  //     url: "http://www.hehe168.com/mapi.php?act=getGoods"
  //   })
  //   .then(function successCallback(res) {
  //     // console.log("res: ")
  //     // console.log(res);
  //     return res;
  //   }, function errorCallback(err) {
  //     console.log("err:");
  //     console.log(err);
  //     return [];
  //   });
  // $scope.getDataAjax = function () {
  // console.log("getData:");
  // console.log(getData);
  // console.log("provideTest");
  // console.log(provideTest);
  //
  // console.log("modify p1:");
  // getData.p1.pname = "p1_m";
  // console.log("getData_modify:");
  // console.log(getData);
  // };
  // console.log("getData:");
  // console.log(getData);
  // console.log("provideTest");
  // console.log(provideTest);

  // $timeout(function () {
  //   console.log("modify p1:");
  //   getData.p1.pname = "p1_m";
  //   console.log("getData_modify:");
  //   console.log(getData);
  // }, 5000);
  // studentsService.logSTC();
  // console.log("innerThing: " + studentsService.innerThing);
  // studentsService.modifySTC("STC modify");
  // studentsService.modifyInner("inner modify");

}]);
