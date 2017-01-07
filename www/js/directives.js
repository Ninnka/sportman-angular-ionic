angular.module('starter.directives', [])

.directive('cardSubscriptionItem', function () {
  return {
    restrict: "EA",
    templateUrl: "",
    replace: true,
    scope: false,
    controller: ""
  };
})

.directive('bubbleSubscriptionItem', function () {
  return {
    restrict: "EA",
    templateUrl: "",
    replace: true,
    scope: false,
    controller: ""
  };
})

// .directive("myContentDirective", function () {
//   return {
//     restrict: "EA",
//     replace: "true",
//     templateUrl: "templates/tab_my/my-content.html",
//     scope: {
//       um: "@",
//       sportmanid: "@",
//       avatar: "@"
//     }
//   };
// })

// .directive("formDirective", function () {
//   console.log("initial formDirective");
//   return {
//     restrict: "EA",
//     templateUrl: "templates/form.html",
//     replace: true,
//     controller: "SignInCtrl",
//   };
// })

.directive("myDirective", function () {
  return {
    restrict: "EA",
    template: function (tElement, tAttrs) {
      return "\
      <div class='userinfo-wrapper'>\
        <p>用户名：{{userinfo.username}}</p>\
        <p>会员等级：{{userinfo.userlevel}}</p>\
        <p>收藏数量：{{collectionCount}}</p>\
        <p>历史数量：{{historyCount.today}}</p>\
        <p>测试：" +
        tAttrs.custominfo +
        "</p>\
        <input type='text' ng-model='value'><br>\
        value in local controller：{{value}}\
        <br><button class='button button-positive' ng-click='showvalue()'>\
      </div>";
    },
    replace: true,
    scope: {
      userinfo: "="
    },
    controller: "myDirectiveCtrl"
  };
})

.directive("templatescriptDirective", function () {
  return {
    restrict: "EA",
    templateUrl: "part.html",
    replace: true
  };
})

.directive("transcludeDirective", function () {
  return {
    restrict: "EA",
    replace: true,
    transclude: true,
    template: "\
    <div>\
      <p>contentTitle</p>\
      <div ng-transclude></div>\
    </div\
    "
  };
})

.directive("linktestDirective", function () {
  return {
    template: "\
    <div>\
    <h1>标题</h1>\
    <p>这里是段落文字</p>\
    </div>\
    \
    ",
    replace: true,
    restrict: "EA",
    scope: {
      a: "=",
      b: "=",
      c: "="
    },
    controller: "myDirectiveCtrl",
    link: function (scope, element, attrs) {
      var h1_ele = element.find("h1");
      h1_ele.text("文本替换成为了strike，DOM操作应该在这里进行，我换了颜色及更改了字体大小，并且添加了移入移除事件");
      h1_ele.css({
        color: "red",
        "font-size": "20px"
      });
      h1_ele.on("mouseover", function () {
        h1_ele.css({
          background: "green"
        });
      });
      h1_ele.on("mouseout", function () {
        h1_ele.css({
          background: "purple"
        });
      });
    }
  };
})

.directive('hideTabs', function ($rootScope) {
  return {
    restrict: 'EA',
    link: function ($scope) {
      $rootScope.hideTabs = 'tabs-item-hide';
      $scope.$on('$destroy', function () {
        $rootScope.hideTabs = ' ';
      });
    }
  };
});
