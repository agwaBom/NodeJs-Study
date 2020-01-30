var Person = {}; //빈 객체 생성

Person["age"] = 20;
Person["name"] = "소녀시대";
Person.mobile = "010-1000-1000"; // . || []를 이용해서 Person객체 안에 집어넣을 수 있다.

console.log("나이 : %d", Person.age);
console.log("이름 : %s", Person.name);
console.log("전화 : %s", Person["mobile"]);

//함수 만들기 1
function add(a, b) {
  return a + b;
}
var result = add(10, 10);
console.log("더하기 (10, 10) : %d", result);

//함수 만들기 2
var add = function(a, b) {
  return a + b;
};
var result = add(10, 10);
console.log("더하기 (10, 10) : %d", result);

//object에 함수를 할당
Person.add = function(a, b) {
  return a + b;
};
console.log("더하기 (10, 10) : %d", Person.add(10, 10));

//함수를 다른 변수에 할당도 가능.
Person.addMore = Person.add;

//실제 객체는 이렇게 생김.
var Person = {
  age: 20,
  name: "소녀시대",
  add: function(a, b) {
    return a + b;
  }
};
