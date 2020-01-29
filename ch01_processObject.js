//argv - 프로세스를 실행할 때 전달되는 파라미터 정보
//env - 환경 변수 정보
//exit() - 프로세스를 끝내는 메서드
console.log("argv 속성의 파라미터 수 : " + process.argv.length);
console.log(process.argv);

if (process.argv.length > 2) {
  console.log("세 번째 파라미터의 값 : %s", process.argv[2]);
}

process.argv.forEach(function(item, index) {
  console.log(index + " : ", item);
});

console.dir(process.env);
console.log("OS 환경변수의 값 : " + process.env["OS"]);
