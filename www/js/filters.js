angular.module('starter.filters', [])

.filter('removeslash', function () {
  var filter = function (input) {
    var slashReg = input.replace(/\//g, "-");
    return slashReg;
  };
  return filter;
});
