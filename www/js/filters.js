angular.module('starter.filters', [])

.filter('removeslash', function () {
  var filter = function (input) {
    var slashReg = input.replace(/\//g, "-");
    return slashReg;
  };
  return filter;
});

// .filter('markfull', function () {
//   var filter = function (mark) {
//     var res = [];
//     res.length = Math.floor(mark);
//     console.log("res length:", res.length);
//     return res;
//   };
//   return filter;
// })
