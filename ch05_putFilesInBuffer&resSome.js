var http = require("http");
var fs = require("fs");

var server = http.createServer();

server.listen(3000, function() {
  console.log("웹 서버 시작됨.");
});

server.on("connection", function(socket) {
  var addr = socket.address();
  console.log("서버에 연결됨 : %s, %d", addr.address, addr.port);
});

//클라이언트 요청 이벤트 처리
server.on("request", function(req, res) {
  console.log("클라이언트 요청이 들어왔습니다");

  var filename = "house.jpg";
  var infile = fs.createReadStream(filename, { flags: "r" }); //jpg 파일 스트림 생성
  var filelength = 0;
  var curlength = 0;

  fs.stat(filename, function(err, stats) {
    //파일의 상태정보를 가져옴
    filelength = stats.size; //파일의 크기를 가져온다.
  });

  res.writeHead(200, { "Content-Type": "image/jpg" }); //헤더에 status code를 200으로 하고 이미지 파일을 가져온다고 명명.

  infile.on("readable", function() {
    //readable 이벤트 발생하면 실행
    var chunk;
    while (null != (chunk = infile.read())) {
      //while loop을 돌면서 계속 chunk를 읽어들임.
      //chunk에 jpg파일의 chunk가 읽혔다면
      console.log("읽어 들인 데이터 크기 : %d 바이트", chunk.length); //해당 파일 조각(chunk)의 크기를 출력
      curlength += chunk.length;
      res.write(chunk, "utf8", function(err) {
        console.log(
          "파일 부분 쓰기 완료 : %d, 파일 크기 : %d",
          curlength, //쓰기 완료된 파일 크기
          filelength //총 파일의 크기
        );
        if (curlength >= filelength) {
          //쓰기가 전부 완료됐다면
          res.end(); //클라이언트에게 응답을 전송함.
        }
      });
    }
  });
});

server.on("close", function() {
  console.log("서버 종료됨.");
});
