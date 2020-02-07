// listen(port, hostname, backlog, callback) - 서버를 실행하고 대기시킴
// close(callback) - 서버를 종료

var http = require("http");

//웹 서버 객체를 생성
var server = http.createServer();

//웹 서버를 시작하여 3000번 포트에서 대기
var port = 3000;
server.listen(port, function() {
  console.log("웹 서버가 시작되었습니다. : %d", port);
});

var host = "192.168.0.5"; //현재 pc의 ip로 설정해야함.
var port = 3000;
server.listen(port, host, "50000", function() {
  //백로그 - 동시접속 연결 수를 결정하는 정보임.
  // Basically, what the listen() backlog affects is how many incoming connections can queue up if your application isn't accept()ing connections as soon as they come in.
  //It's not particularly important to most applications.
  //The maximum value used by most systems is 128, and passing that is generally safe.
  console.log("웹 서버가 시작되었습니다. : %s, %d", host, port);
});
