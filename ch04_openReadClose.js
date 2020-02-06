var fs = require("fs");

fs.open("./output.txt", "r", function(err, fd) {
  //output파일을 열음
  if (err) throw err;

  var buf = new Buffer(10); //10 bytes 버퍼 객체 생성.
  console.log("버퍼 타입 : %s", Buffer.isBuffer(buf)); //버퍼타입이 맞는지 확인.

  fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer) {
    //output 파일을 10byte buffer을 이용하여 읽어들임
    if (err) throw err;

    var inStr = buffer.toString("utf8", 0, bytesRead); //버퍼에 쌓인 데이터를 utf8형식으로 string화 함.
    console.log("파일에서 읽은 데이터 : %s", inStr); //string으로 변환된 데이터

    console.log(err, bytesRead, buffer); //에러는 null, 8바이트가 읽혔고, 해당 버퍼의 내용을 확인할 수 있다.

    fs.close(fd, function() {
      //파일 닫기
      console.log("output.txt 파일을 열고 읽기 완료.");
    });
  });
});
