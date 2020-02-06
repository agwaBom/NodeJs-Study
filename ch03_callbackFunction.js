//함수를 호출했을 때 또 다른 함수를 파라미터로 전달하는 방법.
function add(a, b, callback) {
  var result = a + b;
  //더하기 값을 한 결과 값을 전달된 파라미터로 전달된 콜백 함수를 호출하면서 그 콜백 함수로 전달함.
  callback(result);
}

add(10, 10, function(result) {
  console.log("파라미터로 전달된 콜백 함수 호출됨.");
  console.log("더하기(10, 10)의 결과 : %d", result); //return 문이 없어서 값을 반환하지 못했음에도 불구하고 result에 값이 들어갔음.
});

//함수 안에서 값을 반환할 때, 새로운 함수를 만들어 반환하는 방법.
function add(a, b, callback) {
  var result = a + b;
  callback(result);

  var history = function() {
    return a + " + " + b + " = " + result;
  };
  return history; //history 라는 함수가 반환됨.
}

var add_history = add(10, 10, function(result) {
  console.log("파라미터로 전달된 콜백 함수 호출됨.");
  console.log("더하기 (10, 10)의 결과 : %d", result); //callback 함수에서 실행됨.
});
console.log("결과 값으로 받은 함수 실행 결과 : " + add_history()); // 새로운 history함수가 실행되면서 출력하게 됨

//
function add(a, b, callback) {
  var result = a + b;
  callback(result);

  var count = 0;
  var history = function() {
    count++; //history 함수가 몇번이나 실행됐는지 알 수 있게 됨.
    return count + " : " + a + " + " + b + " = " + result;
  };
  return history;
}

var add_history = add(10, 10, function(result) {
  console.log("파라미터로 전달된 콜백 함수 호출됨");
  console.log("더하기 (10, 10)의 결과 : %d", result);
});

console.log("결과 값으로 받은 함수 실행 결과 : ", add_history());
console.log("결과 값으로 받은 함수 실행 결과 : ", add_history());
console.log("결과 값으로 받은 함수 실행 결과 : ", add_history()); //콜백으로 인해서 함수가 계속 바뀜
