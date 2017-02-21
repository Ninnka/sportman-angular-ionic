angular.module('starter.services', [])

  .service("UsrInfoLocal", [function () {
    this.id = "";
    this.um = "";
    this.sportmanid = "";
    this.avatar = "";
    this.email = "";
    this.pn = "";
    this.gender = "";
    this.empty = true;
    this.setid = function (id) {
      this.id = id;
    };
    this.setUm = function (um) {
      this.um = um;
    };
    this.setSpmid = function (sportmanid) {
      this.sportmanid = sportmanid;
    };
    this.setAvatar = function (avatar) {
      this.avatar = avatar;
    };
    this.setEmail = function (email) {
      this.email = email;
    };
    this.setPn = function (pn) {
      this.pn = pn;
    };
    this.setGender = function (gender) {
      this.gender = gender;
    };
    this.setEmpty = function (flag) {
      this.empty = flag;
    };
    this.clear = function () {
      this.setid("");
      this.setUm("");
      this.setSpmid("");
      this.setAvatar("");
      this.setEmail("");
      this.setPn("");
      this.setGender("");
      this.setEmpty(true);
    };
  }])

  .factory("SignInOrUpApi", function () {
    return {
      signInUrl: "http://localhost/sportman/signin.php",
      signUpUrl: "http://localhost/sportman/signup.php"
    };
  })

  .factory("SignInOrUpFac", function ($http, SignInOrUpApi) {
    return {
      signIn: function (usrname, usrpassword) {
        return $http({
          method: "POST",
          url: SignInOrUpApi.signInUrl,
          data: {
            username: usrname,
            password: usrpassword
          },
          timeout: 5000
        });
      },
      signUp: function (usrname, usrpassword) {
        return $http({
          method: "POST",
          url: SignInOrUpApi.signUpUrl,
          data: {
            username: usrname,
            password: usrpassword
          },
          timeout: 3000
        });
      }
    };
  })

  .factory("Logout", ['UsrInfoLocal', 'ls', function (UsrInfoLocal, ls) {
    return {
      logoutCurrentAccount: function () {
        UsrInfoLocal.clear();
        ls.clear();
      }
    };
  }])

  .factory("ls", function ($window) {
    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key, defaultValue) {
        return JSON.parse($window.localStorage[key]) || defaultValue;
      },
      remove: function (key) {
        $window.localStorage.removeItem(key);
      },
      clear: function () {
        $window.localStorage.clear();
      }
    };
  })

  .factory("getData", ['$http', function ($http) {
    return {
      get: function (url, params) {
        return $http({
          method: "GET",
          url,
          params: params
        });
      },
      post: function (url, data) {
        return $http({
          method: "POST",
          url,
          data: data
        });
      }
    };
  }])

  .factory("stateGo", function ($rootScope, $state) {
    return {
      goToState: function (target, data, animation) {
        // if (data !== undefined) {
        // } else {
        //   $state.go(target);
        // }
        // if (data !== undefined) {
        //   console.log(data.type);
        //   console.log(data.id);
        // }
        $state.go(target, data);
        if (animation === "back") {
          $rootScope.outAnimation();
        } else {
          $rootScope.inAnimation();
        }
      }
    };
  })

  .factory("getLocation", function () {
    return {
      // https://api.thinkpage.cn/v3/location/search.json?key=mqzzrlzwvkgw0762&q=
      getLocation: function () {

      }
    };
  })

  .factory('api', function () {
    return {
      sportman_pic_prefix: 'http://ok7pzw2ak.bkt.clouddn.com/',
      activity_home: 'http://localhost/sportman/activity_home.php',
      activity_detail: 'http://localhost/sportman/activity_detail.php',
      stadium_home: 'http://localhost/sportman/stadium_home.php',
      stadium_detail: 'http://localhost/sportman/stadium_detail.php',
      stadium_detail_equipment: 'http://localhost/sportman/stadium_detail_equipment.php',
      search_activity: 'http://localhost/sportman/search_activity.php',
      search_stadium: 'http://localhost/sportman/search_stadium.php',
      setting_sportmanid: 'http://localhost/sportman/setting_sportmanid.php',
      setting_changepassword: 'http://localhost/sportman/setting_changepassword.php',
      setting_changemobile: 'http://localhost/sportman/setting_changemobile.php',
      setting_email: 'http://localhost/sportman/setting_email.php',
      user_activity: 'http://localhost/sportman/user_activity.php',
      user_activity_star: 'http://localhost/sportman/user_activity_star.php',
      user_activity_recommend: 'http://localhost/sportman/user_activity_recommend.php',
      user_stadium: 'http://localhost/sportman/user_stadium.php',
      user_stadium_star: 'http://localhost/sportman/user_stadium_star.php',
      user_stadium_recommend: 'http://localhost/sportman/user_stadium_recommend.php',
      user_review: 'http://localhost/sportman/user_review.php',
      user_payment_activity: 'http://localhost/sportman/user_payment_activity.php',
      user_payment_stadium: 'http://localhost/sportman/user_payment_stadium.php',
      user_payment_all: 'http://localhost/sportman/user_payment_all.php',
      activity_addstar: 'http://localhost/sportman/activity_addstar.php',
      activity_addrecommend: 'http://localhost/sportman/activity_addrecommend.php',
      activity_removestar: 'http://localhost/sportman/activity_removestar.php',
      activity_removerecommend: 'http://localhost/sportman/activity_removerecommend.php',
      activity_createpayment: 'http://localhost/sportman/activity_createpayment.php',
      activity_deletepayment: 'http://localhost/sportman/activity_deletepayment.php',
      stadium_addstar: 'http://localhost/sportman/stadium_addstar.php',
      stadium_addrecommend: 'http://localhost/sportman/stadium_addrecommend.php',
      stadium_removestar: 'http://localhost/sportman/stadium_removestar.php',
      stadium_removerecommend: 'http://localhost/sportman/stadium_removerecommend.php',
      stadium_createpayment: 'http://localhost/sportman/stadium_createpayment.php',
      stadium_deletepayment: 'http://localhost/sportman/stadium_deletepayment.php',
      activity_addreview: 'http://localhost/sportman/activity_addreview.php',
      stadium_addreview: 'http://localhost/sportman/stadium_addreview.php',
      activity_reviewlist: 'http://localhost/sportman/activity_reviewlist.php',
      stadium_reviewlist: 'http://localhost/sportman/stadium_reviewlist.php'
    };
  })

  .service("studentsService", function () {
    var somethingCommon = "somethingCommon_init";

    this.innerThing = "innerThing";
    this.modifyInner = function (modifyStr) {
      this.innerThing = modifyStr;
    };
    this.logSTC = function () {
      console.log("somethingCommon: " + somethingCommon);
    };
    this.modifySTC = function (modifyStr) {
      somethingCommon = modifyStr;
    };
  })

  .provider("otherProviderData", function () {
    console.log("initial otherProviderData instance");
    this.$get = function () {
      return {
        otherProviderDataKey: "otherProviderDataValue"
      };
    };
  })

  .provider("providerData", function () {
    this.$get = function () {
      return {
        providerDataKey: "providerDataValue"
      };
    };
  });
