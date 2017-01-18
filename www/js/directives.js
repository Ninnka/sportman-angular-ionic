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
})

.directive('activity', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: "templates/directive-tmpl/activity.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('stadium', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: "templates/directive-tmpl/stadium.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('searchWaiting', function () {
  return {
    restrict: 'EA',
    replace: false,
    templateUrl: "templates/directive-tmpl/search-waiting.html",
    link: function (scope, element, attrs) {

    }
  }
})

.directive('searchActivity', function () {
  return {
    restrict: 'EA',
    replace: false,
    templateUrl: "templates/directive-tmpl/search-activity.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('searchStadium', function () {
  return {
    restrict: 'EA',
    replace: false,
    templateUrl: "templates/directive-tmpl/search-stadium.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('activityCollection', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: "templates/directive-tmpl/activity-collection.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('activityReview', function () {
  return {
    restrict: 'EA',
    replace: false,
    templateUrl: "templates/directive-tmpl/activity-review.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('activityRecommend', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: "templates/directive-tmpl/activity-recommend.html",
    link: function (scope, element, attrs) {

    }
  }
})

.directive('stadiumCollection', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: "templates/directive-tmpl/stadium-collection.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('stadiumReview', function () {
  return {
    restrict: 'EA',
    replace: false,
    templateUrl: "templates/directive-tmpl/stadium-review.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('stadiumRecommend', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: "templates/directive-tmpl/stadium-recommend.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('stadiumBook', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: "templates/directive-tmpl/stadium-book.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('reviewBtn', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: "templates/directive-tmpl/review-btn.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('reviewText', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: "templates/directive-tmpl/review-text.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('myHistory', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: "templates/directive-tmpl/my-history.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('payBtn', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: "templates/directive-tmpl/pay-btn.html",
    link: function (scope, element, attrs) {

    }
  };
})

.directive('reviewStar', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: "templates/directive-tmpl/review-star.html",
    scope: {
      score: "@"
    },
    link: function (scope, element, attrs) {
      var full = Math.floor(scope.score);
      var half = scope.score - full;
      var dark = 5 - Math.ceil(scope.score);
      scope.fullarr = [];
      for (var i = 0; i < full; i++) {
        scope.fullarr.push(" ");
      }
      scope.halfarr = [];
      for (var j = 0; j < half; j++) {
        scope.halfarr.push(" ");
      }
      scope.darkarr = [];
      for (var k = 0; k < dark; k++) {
        scope.darkarr.push(" ");
      }
    }
  };
})

.directive('ionNavbuttonsgo', function () {
  return {
    restrict: 'EA',
    templateUrl: "templates/directive-tmpl/ion-nav-buttons-go.html",
    replace: true,
    scope: {
      target: "@"
    },
    controller: "ionNavButtonsGoCtrl"
  };
});
