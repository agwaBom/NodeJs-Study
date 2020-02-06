var Calc = require("./ch04_calculatorObjToModule"); //만든 모듈을 import
var calc = new Calc(); //Calc의 객체를 생성.

calc.emit("stop"); //stop이벤트 발생.

console.log(Calc.title + "에 stop 이벤트 전달함.");
