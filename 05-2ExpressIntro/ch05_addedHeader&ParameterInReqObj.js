// query - 클라이언트에서 GET방식으로 전송한 요청 파라미터를 확인
// body - 클라이언트에서 POST방식으로 전송한 요청 파라미터를 확인(body-parser와 같은 외장모듈이 필요)
// header(name) - 헤더를 확인

var express = require("express");
var http = require("http");

var app = express();

app.use(function(req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함");

  var userAgent = req.header("User-Agent");
  var paramName = req.query.name; //http://localhost:3000/?name=mike에서 mike parameter을 읽어올 수 있다.

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과.</h1>");
  res.write("<div><p>User-Agent : " + userAgent + "</p></div>"); // 접속 정보(header) 확인.
  res.write("<div><p>Param name : " + paramName + "</p></div>"); // mike
  res.end();
});

http.createServer(app).listen(3000, function() {
  console.log("Express 서버가 3000번 포트에서 시작됨.");
});
