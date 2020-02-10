// URL 파라미터 사용하기.
// 클라이언트에서 요청할 때 URL뒤에 ?기호를 붙이면 요청 파라미터(query string)을 추가하여 보낼 수 있다.
// 이거 이외에도 URL 파라미터를 사용함.
var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var static = require("serve-static");

var app = express();
var router = express.Router(); // 라우터 객체 참조

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("", express.static(path.join(__dirname, "public")));

// 라우팅 함수 등록
// /process/login -> /process/login:name으로 변경. /process/login/뒤에 오는 값을 파라미터로 처리하겠다는 의미임.
// 이렇게 지정한 파라미터는 req.params 객체 안에 들어감.
router.route("/process/login/:name").post(function(req, res) {
  console.log("/process/login/:name 처리함");
  // :name으로 표시된 부분은 req.params.name속성으로 접근할 수 있음. -> token이라고 함.
  var paramName = req.params.name;

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>Param name : " + paramName + "</p></div>");
  res.write("<div><p>Param id : " + paramId + "</p></div>");
  res.write("<div><p>Param password : " + paramPassword + "</p></div>");
  res.write("<br><br><a href='/login3.html'>로그인 페이지로 돌아가기</a>");
  res.end();
});

// 라우터 객체를 app 객체에 등록.
app.use("/", router);

http.createServer(app).listen(3000, function() {
  console.log("Express 서버가 3000번 포트에서 시작됨.");
  console.log(path.join(__dirname, "public"));
});
