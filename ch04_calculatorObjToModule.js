var util = require("util");
var EventEmitter = require("events").EventEmitter; //util과 EventEmitter import

var Calc = function() {
  var self = this;

  this.on("stop", function() {
    console.log("Calc에 stop event 전달됨.");
  }); //self객체에 stop에 대한 listener function을 집어넣는다.
};

util.inherits(Calc, EventEmitter); //Calc객체가 event를 처리할 수 있도록 EventEmitter을 상속받는다.

Calc.prototype.add = function(a, b) {
  return a + b; //Calc의 객체에 add function을 추가함.
};

module.exports = Calc; //만들어진 모듈을 export
module.exports.title = "calculator"; //해당 모듈의 title 속성값으로 calculator이라고 명명함.
