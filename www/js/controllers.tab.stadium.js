angular.module('starter.controllers.tab.stadium', [])

// 场馆页面的控制器
.controller('StadiumCtrl', ['$scope', 'stateGo', '$rootScope', function ($scope, stateGo, $rootScope) {

  $scope.$on("$ionicView.enter", function () {
    $rootScope.clearHistory();
  });

  $scope.toDetail = function () {
    stateGo.goToState("detail_stadium");
  };

  $scope.areaList = [
    "",
    "海珠区",
    "天河区",
    "荔湾区",
    "越秀区",
    "番禹区",
    "花都区",
    "萝岗区",
    "白云区",
    "南沙区",
    "黄埔区",
    "增城区",
    "从化区"
  ];
  $scope.areaName = "";

  $scope.typeList = [
    "",
    "篮球",
    "足球",
    "羽毛球",
    "网球",
    "台球",
    "乒乓球",
    "排球",
    "射箭",
    "滑雪",
    "攀登",
    "滑冰"
  ];
  $scope.typeName = "";

  $scope.priceList = [
    "",
    "0",
    "1~49",
    "50~149",
    "150~"
  ];
  $scope.price = "";

  $scope.stadiumList = [
    {
      stadiumname: "胜利运动场（万寿路店）",
      stadiumpost: "img/tabletenis-star.png",
      stadiumtrade: "乒乓球、羽毛球",
      stadiumopentime: "08:00-22:00",
      stadiumposition: "海珠区",
      stadiumprice: 9
    },
    {
      stadiumname: "广州市射击射箭运动管理中心",
      stadiumpost: "img/shot-stadium.png",
      stadiumtrade: "台球、射箭、射击",
      stadiumopentime: "08:00-19:00",
      stadiumposition: "天河区",
      stadiumprice: 99
    },
    {
      stadiumname: "杰冠真人CS野战基地",
      stadiumpost: "img/cs-stadium.png",
      stadiumtrade: "仿真枪机野战",
      stadiumopentime: "08:00-18:00",
      stadiumposition: "海珠区",
      stadiumprice: 299
    },
    {
      stadiumname: "大世界保龄球馆",
      stadiumpost: "img/bowling-stadium.png",
      stadiumtrade: "仿真枪机野战",
      stadiumopentime: "08:00-18:00",
      stadiumposition: "海珠区",
      stadiumprice: 199
    },
    {
      stadiumname: "冰河湾真冰溜冰场",
      stadiumpost: "img/skip-stadium.png",
      stadiumtrade: "乒乓球、羽毛球",
      stadiumopentime: "08:00-22:00",
      stadiumposition: "海珠区",
      stadiumprice: 9
    },
    {
      stadiumname: "胜利运动场（万寿路店）",
      stadiumpost: "img/tabletenis-star.png",
      stadiumtrade: "乒乓球、羽毛球",
      stadiumopentime: "08:00-22:00",
      stadiumposition: "海珠区",
      stadiumprice: 9
    },
    {
      stadiumname: "广州市射击射箭运动管理中心",
      stadiumpost: "img/shot-stadium.png",
      stadiumtrade: "台球、射箭、射击",
      stadiumopentime: "08:00-19:00",
      stadiumposition: "天河区",
      stadiumprice: 99
    }
  ];
}])

.controller('DetailStadiumCtrl', ['$scope', 'stateGo', function ($scope, stateGo) {

  $scope.viewTitle = "详细页面";

  $scope.totalScore = 3.5;

  $scope.bookStadium = function () {
    console.log("bookStadium");
    stateGo.goToState("detail_stadium_book-list", {
      type: "乒乓球",
      id: 111111
    });
  };

  $scope.addStar = function () {
    // todo
  };

  $scope.addRecommend = function () {
    // todo
  };

}])

.controller('BooklistStadiumCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
  $scope.type = $stateParams.type;
  $scope.id = $stateParams.id;
  // console.log("type:", $stateParams.type);
  // console.log("id:", $stateParams.id);

  $scope.equipmentLsit = [
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 9,
      equipmentremain: 18
    },
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 19,
      equipmentremain: 30
    },
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 59,
      equipmentremain: 10
    },
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 9,
      equipmentremain: 9
    },
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 29,
      equipmentremain: 39
    },
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 119,
      equipmentremain: 25
    },
    {
      equipmentname: "大厅桌球",
      equipmentdevice: "双鱼座化工板质球桌",
      equipmentgeology: "水泥地板",
      equipmentposition: "运动场大厅",
      equipmentprice: 70,
      equipmentremain: 40
    }
  ];
}])

.controller('BookselectStadiumCtrl', ['$scope', '$stateParams', '$cordovaDialogs', 'stateGo', function ($scope, $stateParams, $cordovaDialogs, stateGo) {
  $scope.type = $stateParams.type;
  $scope.id = $stateParams.id;

  $scope.selectinfo = {
    selectMount: 1,
    selectStartTime: "",
    selectEndTime: ""
  };

  $scope.insSelectMount = function () {
    $scope.selectinfo.selectMount = $scope.selectinfo.selectMount < 5 ? ++$scope.selectinfo.selectMount : 5;
  };

  $scope.decSelectMount = function () {
    $scope.selectinfo.selectMount = $scope.selectinfo.selectMount > 1 ? --$scope.selectinfo.selectMount : 1;
  };

  $scope.openNumberDialog = function () {
    $cordovaDialogs.prompt('输入预定的数量', '数量', ['确认', '取消'], $scope.selectinfo.selectMount)
      .then(function (result) {
        var input = result.input1;
        // no button = 0, 'OK' = 1, 'Cancel' = 2
        var btnIndex = result.buttonIndex;
        alert("input: " + input);
        alert("btnIndex: " + btnIndex);
        var regexp = /[A-Za-z\.]/;
        if (btnIndex == 1 && !regexp.test(input) && Number(input) >= 1 && Number(input) <= 5) {
          $scope.selectinfo.selectMount = Number(input);
        } else {
          alert("数量必须在1-5");
        }
      });
  };

  $scope.submitSelectInfo = function () {
    stateGo.goToState("prepare-pay", {
      type: $scope.type,
      id: $scope.id,
      selectMount: $scope.selectinfo.selectMount,
      unitprice: 10
    });
  };
}]);
