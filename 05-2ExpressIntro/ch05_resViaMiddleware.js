var express = require("express");
var http = require("http");

var app = express();
// 노드에서는 미들웨어를 이용하여 순차적으로 필요한 기능을 실행시킬 수 있음.
// use()를 사용하여 미들웨어를 등록해두면 모든 클라이언트 요청이 해당 미들웨어를 거치면서 로그를 남김.
// 미들웨어 내에서 next()를 호출하면 다음 미들웨어로 넘어가게됨.
// get()을 이용하여 별도로 등록된 응답처리에 대한 응답이 가능해짐.(/users, / ...etc) -> 요청 패스에 따라서 각각을 담당하는 함수로 이동시킴.s
app.use(function(req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함");

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.end("<h1>Express 서버에서 응답한 결과.</h1>"); //클라이언트에게 응답을 보내며 종료.
});

http.createServer(app).listen(3000, function() {
  console.log("Express 서버가 3000번 포트에서 시작됨.");
});
