var http = require("http");
var fs = require("fs");

var server = http.createServer();

server.listen(3000, function() {
  console.log("웹서버 시작됨.");
});

server.on("connection", function(socket) {
  var addr = socket.address();
  console.log("클라이언트가 접속됨: %s, %d", addr.address, addr.port);
});

server.on("request", function(req, res) {
  console.log("클라이언트 요청이 들어옴");

  var filename = "house.jpg";
  var infile = fs.createReadStream(filename, { flags: "r" });
  infile.pipe(res); //파이프를 이용하여 파일을 스트림으로 읽어들인 후 res로 보내버림.
  //헤더를 설정할 수 없다는 제약이 존재하므로 필요할때만 사용.
});

server.on("close", function() {
  console.log("서버가 종료됩니다.");
});
