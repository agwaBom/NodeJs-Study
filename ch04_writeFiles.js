var fs = require("fs");

//파일에 데이터 쓰기 (비동기식)
fs.writeFile("./output.txt", "Hello World", function(err) {
  if (err) {
    console.log("err : " + err);
  }
  console.log("output.txt 파일에 데이터 쓰기 완료."); //Hello World라고 적혀져 있는 output.txt파일이 생성됨.
});
