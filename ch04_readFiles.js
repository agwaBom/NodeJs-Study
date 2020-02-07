var fs = require("fs"); //파일시스템에 접근하기 위한 모듈.

// readFile(filename, encoding, callback) - 비동기식 IO 파일 읽기
// readFileSync(filename, encoding) - 동기식 IO 파일 읽기
// writeFile(filename, encoding = 'utf8', callback) - 비동기식 IO 파일 쓰기
// writeFileSync(filename, encoding = 'utf8') - 동기식 IO 파일 쓰기no

//동기식 IO로 파일 읽기. - 대기 처리 대기 처리....
var data = fs.readFileSync("./package.json", "utf8");
console.log(data);

//비동기식 IO로 파일 읽기
fs.readFile("./package.json", "utf8", function(err, data) {
  //읽어들인 데이터를 출력.
  console.log(data);
});

console.log("프로젝트 폴더 안의 package.json 파일을 읽도록 요청했습니다.");
