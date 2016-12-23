angular.module('starter.services', [])

.service("UsrInfoLocal", [function () {
  this.um = "";
  this.sportmanid = "";
  this.avatar = "";
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
  this.setEmpty = function (flag) {
    this.empty = flag;
  };
  this.clear = function () {
    this.setUm("");
    this.setSpmid("");
    this.setAvatar("");
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
    signIn(usrname, usrpassword) {
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
    signUp(usrname, usrpassword) {
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

.factory("Logout", ['UsrInfoLocal', function (UsrInfoLocal) {
  return {
    logoutCurrentAccount: function () {

    }
  };
}])

.factory("ls", function ($window) {
  return {
    set(key, value) {
      $window.localStorage[key] = value;
    },
    get(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject(key, defaultValue) {
      return JSON.parse($window.localStorage[key]) || defaultValue;
    },
    remove(key) {
      $window.localStorage.removeItem(key);
    },
    clear() {
      $window.localStorage.clear();
    }
  };
})

.factory("ajaxGetData", function ($http) {
  return {
    ajaxGet(url) {
      return $http({
        method: "GET",
        url
      });
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
