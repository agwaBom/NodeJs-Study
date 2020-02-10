var express = require("express");
var http = require("http");

var app = express();

app.use(function(req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함");
  req.user = "Mike"; //첫 번째 미들웨어에서 request가 발생하면 사용자 정보를 "Mike"로 설정.

  next(); //next를 이용하여 다음 미들웨어로 넘겨준다.
});

app.use(function(req, res, next) {
  console.log("두 번째 미들웨어에서 요청을 처리함.");

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.end("<h1>Express 서버에서 " + req.user + "에게 응답한 결과.</h1>"); // request한 유저의 이름을 출력하고 종료.
});

http.createServer(app).listen(3000, function() {
  console.log("Express 서버가 3000번 포트에서 시작됨.");
});
