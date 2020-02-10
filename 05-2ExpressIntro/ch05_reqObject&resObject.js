// send(body) - 클라이언트에 응답데이터를 보냄. (HTML-String, Buffer-Object, JSON-Object, JSON-Array)
// status(code) - HTTP 상태 코드를 반환함. 상태코드는 end()나 send()와 같은 전송메소드가 추가로 있어야 전송이 가능함.
// sendStatus(statusCode) - HTTP 상태 코드를 반환함. 상태코드와 상태메시지가 함께 전송됨.
// redirect(status, path) - 웹페이지 경로를 강제로 이동시킴.
// render(view, locals, callback) - 뷰 엔진을 사용하여 문서를 생성하여 전송.

var express = require("express");
var http = require("http");

var app = express();

app.use(function(req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함");

  //send()를 이용하여 클라이언트에게 JSON데이터를 전송할 수 있다.
  // 모바일 단말기의 웹 앱, 앱과 같은 경우에는 웹 문서를 단말에 두고 Ajax || 웹 소켓을 이용하여 데이터만 수신하여 화면에 보여줄 때가 많음.
  // 송신해야 할 데이터 양을 줄일 수 있다.
  res.send({ name: "소녀시대", age: 20 });
  // res.status(403).send("Forbidden");
  // res.sendStatus(403); //상태 코드를 반환할 수도 있다.
  // res.redirect("http://google.co.kr");
});

http.createServer(app).listen(3000, function() {
  console.log("Express 서버가 3000번 포트에서 시작됨.");
});
