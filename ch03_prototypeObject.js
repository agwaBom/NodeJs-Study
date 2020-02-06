function Person(name, age) {
  //person 함수를 정의. 함수도 객체이기 때문에 객체로서의 역할을 할 수 있다.(constructor)
  this.name = name;
  this.age = age;
}

//다른 인스턴스 객체에 walk function을 속성으로 추가할 때.
//Person에 직접적으로 넣는 것이 아니기 때문에 Person.walk = function()보다 prototype이 메모리 관리의 효율성을 높일 수 있다.
Person.prototype.walk = function(speed) {
  console.log(speed + "km 속도로 걸어갑니다.");
};

var person01 = new Person("소녀시대", 20); //객체 1
var person02 = new Person("걸스데이", 22); //객체 2

console.log(person01.name + "객체의 walk(10)을 호출합니다.");
person01.walk(10);
