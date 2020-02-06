// open(path, flags, mode, callback) - 파일 열기
// read(fd, buffer, offset, length, position, callback) - 지정한 부분의 파일 읽기
// write(fd, buffer, offset, length, position, callback) - 지정한 부분에 데이터 쓰기
// close(fd, callback) - 파일 닫기

var fs = require("fs");

//r - 읽기, w - 쓰기, w+ - 읽기/쓰기, 이전 내용을 전부 삭제, r+ - 일기/쓰기, 이전 내용에 추가
fs.open("./output.txt", "w", function(err, fd) {
  if (err) throw err;

  var buf = new Buffer("안녕!\n");
  fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
    if (err) throw err;
    console.log(err, written, buffer);

    s.close(fd, function() {
      console.log("파일 열고 데이터 쓰고 파일 닫기 완료.");
    });
  });
}); //open -> write -> close 순으로 함수를 호출함
