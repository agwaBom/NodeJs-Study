// console - 콘솔 창에 결과를 보여주는 객체
// process - 프로세스의 실행에 대한 정보를 다루는 객체
// export - 모듈을 다루는 객체
// dir(object) - 자바스크립트 객체의 속성들을 출력
// time(id) - 실행 시간을 측정하기 위한 시작 시간을 기록
// timeEnd(id) - 실행 시간을 측정하기 위한 끝 시간을 기록

var result = 0;

console.time("duration_sum");

for (var i = 0; i <= 1000; i++) {
  result += i;
}

console.timeEnd("durantion_sum");
console.log("1 부터 1000까지 더한 결과물 : %d", result);
//__filename - 실행한 파일의 전체 path를 출력함.
console.log("현재 실행한 파일의 이름 : %s", __filename);
//__dirname - 실행한 파일이 들어있는 폴더의 전체 path를 출력.
console.log("현재 실행한 파일의 패스 : %s", __dirname);

var person = { name: "소녀시대", age: 20 }; // 자바스크립트의 객체 생성방법.
console.dir(person); //dir메서트를 이용하여 person객체 안에 들어잇는 속성을 출력할 수 있다.
