angular.module('starter.services', [])

.service("UsrInfoLocal", [function () {
  this.um = "";
  this.sportmanid = "";
  this.avatar = "";
  this.email = "";
  this.pn = "";
  this.gender = "";
  this.empty = true;
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
    signInUrl: "http://localhost:8080/sportman/auth",
    signUpUrl: "http://localhost:8080/sportman/signup"
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
        timeout: 10000
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

.factory("ajaxGetData", function ($http) {
  return {
    ajaxGet: function (url) {
      return $http({
        method: "GET",
        url
      });
    }
  };
})

.factory("stateGo", function ($rootScope, $state) {
  return {
    goToState: function (target, data) {
      // if (data !== undefined) {
      // } else {
      //   $state.go(target);
      // }
      // if (data !== undefined) {
      //   console.log(data.type);
      //   console.log(data.id);
      // }
      $state.go(target, data);

      $rootScope.inAnimation();
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

.factory("getData", function () {
  return {
    p1: {
      pname: "p1",
      page: "12"
    },
    p2: {
      pname: "p2",
      page: "13"
    },
    p3: {
      pname: "p3",
      page: "14"
    }
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
