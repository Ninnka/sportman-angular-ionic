angular.module('starter.services', [])

.service("UsrInfoLocal", [function () {
  this.id = "";
  this.um = "";
  this.sportmanid = "";
  this.avatar = "";
  this.email = "";
  this.pn = "";
  this.gender = "";
  this.address = '';
  this.socialbg = '';
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
  this.setAddress = function (address) {
    this.address = address;
  };
  this.setEmpty = function (flag) {
    this.empty = flag;
  };
  this.setSocialbg = function (socialbg) {
    this.socialbg = socialbg;
  };
  this.clear = function () {
    this.setid("");
    this.setUm("");
    this.setSpmid("");
    this.setAvatar("");
    this.setEmail("");
    this.setPn("");
    this.setGender("");
    this.setAddress('');
    this.setSocialbg('');
    this.setEmpty(true);
  };
}])

.factory("SignInOrUpApi", ['config', function (config) {
  return {
    signInUrl: config.env + 'signin.php',
    signUpUrl: config.env + 'signup.php'
  };
}])

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
      if (animation === "back") {
        $rootScope.outAnimation();
      } else {
        $rootScope.inAnimation();
      }
      $state.go(target, data);
    },
    goToBack: function (target) {
      $rootScope.toBackView(target);
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

.factory('config', function () {
  return {
    // env: 'http://1.sportman.applinzi.com/'
    env: 'http://localhost/sportman/'
  };
})

.factory('api', ['config', function (config) {
  return {
    sportman_pic_prefix: 'http://ok7pzw2ak.bkt.clouddn.com/',
    activity_home: config.env + 'activity_home.php',
    activity_detail: config.env + 'activity_detail.php',
    stadium_home: config.env + 'stadium_home.php',
    stadium_detail: config.env + 'stadium_detail.php',
    stadium_detail_equipment: config.env + 'stadium_detail_equipment.php',
    search_activity: config.env + 'search_activity.php',
    search_stadium: config.env + 'search_stadium.php',
    setting_sportmanid: config.env + 'setting_sportmanid.php',
    setting_changepassword: config.env + 'setting_changepassword.php',
    setting_changemobile: config.env + 'setting_changemobile.php',
    setting_email: config.env + 'setting_email.php',
    setting_person_info: config.env + 'setting_person_info.php',
    user_activity: config.env + 'user_activity.php',
    user_activity_star: config.env + 'user_activity_star.php',
    user_activity_recommend: config.env + 'user_activity_recommend.php',
    user_stadium: config.env + 'user_stadium.php',
    user_stadium_star: config.env + 'user_stadium_star.php',
    user_stadium_recommend: config.env + 'user_stadium_recommend.php',
    user_review: config.env + 'user_review.php',
    user_history: config.env + 'user_history.php',
    user_payment_activity: config.env + 'user_payment_activity.php',
    user_payment_stadium: config.env + 'user_payment_stadium.php',
    user_payment_all: config.env + 'user_payment_all.php',
    activity_addstar: config.env + 'activity_addstar.php',
    activity_addrecommend: config.env + 'activity_addrecommend.php',
    activity_removestar: config.env + 'activity_removestar.php',
    activity_removerecommend: config.env + 'activity_removerecommend.php',
    activity_createpayment: config.env + 'activity_createpayment.php',
    activity_deletepayment: config.env + 'activity_deletepayment.php',
    stadium_addstar: config.env + 'stadium_addstar.php',
    stadium_addrecommend: config.env + 'stadium_addrecommend.php',
    stadium_removestar: config.env + 'stadium_removestar.php',
    stadium_removerecommend: config.env + 'stadium_removerecommend.php',
    stadium_createpayment: config.env + 'stadium_createpayment.php',
    stadium_deletepayment: config.env + 'stadium_deletepayment.php',
    activity_addreview: config.env + 'activity_addreview.php',
    stadium_addreview: config.env + 'stadium_addreview.php',
    activity_reviewlist: config.env + 'activity_reviewlist.php',
    stadium_reviewlist: config.env + 'stadium_reviewlist.php',
    activity_pay: config.env + 'activity_pay.php',
    stadium_pay: config.env + 'stadium_pay.php',
    activity_getpayment: config.env + 'activity_getpayment.php',
    stadium_getpayment: config.env + 'stadium_getpayment.php',
    activity_getfeature: config.env + 'activity_getfeature.php',
    stadium_getfeature: config.env + 'stadium_getfeature.php',
    socialcircle: config.env + 'socialcircle.php',
    socialcircle_addlike: config.env + 'socialcircle_addlike.php',
    socialcircle_removelike: config.env + 'socialcircle_removelike.php',
    socialcircle_addcomment: config.env + 'socialcircle_addcomment.php',
    socialcircle_detail: config.env + 'socialcircle_detail.php',
    socialcircle_detailcomment: config.env + 'socialcircle_detailcomment.php',
    socialcircle_my: config.env + 'socialcircle_my.php',
    socialcircle_publish_msg: config.env + 'socialcircle_publish_msg.php',
    activity_home_hot: config.env + 'activity_home_hot.php',
    activity_home_recommend: config.env + 'activity_home_recommend.php',
    user_check_attend_activity: config.env + 'user_check_attend_activity.php'
  };
}])

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
});
