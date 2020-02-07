var http = require("http");
var fs = require("fs");

var server = http.createServer();

var port = 3000;
server.listen(port, function() {
  console.log("웹 서버가 시작됐습니다 : %d", port);
});

server.on("connection", function(socket) {
  var addr = socket.address();
  console.log("클라이언트가 접속했습니다. : %s, %d", addr.address, addr.port);
});

server.on("request", function(req, res) {
  console.log("클라이언트 요청이 들어왔습니다.");
  var filename = "house.jpg";
  fs.readFile(filename, function(err, data) {
    //house.jpg를 읽어들임

    // text/plain - 일반 텍스트
    // text/html - HTML문서
    // text/css - CSS문서
    // text/xml - XML문서
    // image/jpeg, image/png - jpeg, png사진파일
    // video/mpeg, audio/mp3 - mpeg비디오/mp3음악파일
    // application/zip - zip압축파일
    res.writeHead(200, { "Content-Type": "image/jpg" }); //type header가 image/jpg으로 이미지데이터임을 표시
    res.write(data); //응답 데이터
    res.end();
  });
});

server.on("close", function() {
  console.log("서버가 종료됩니다.");
});
