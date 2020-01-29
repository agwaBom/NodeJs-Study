//모듈 분리 전
var calc = {};
calc.add = function(a, b) {
  return a + b;
};

console.log(
  "모듈을 분리하기 전 - calc.add 함수 호출 결과 : %d",
  calc.add(10, 10)
);
//모듈 분리
var calc = require("./ch02cal"); // _사용하면 안불리넹..
console.log(
  "모듈을 분리한 후 - calc.add 함수 호출 결과 : %d",
  calc.add(10, 10)
);
