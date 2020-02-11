// 라우터 미들웨어
// get(callback) - GET 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.
// post(callback) - POST 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.
// put(callback) - PUT 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.
// delete(callback) - DELETE 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.
// all(callback) - 모든 요청 방식을 처리, 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.

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
// 로그인 후, localhost:3000/process/login 로 요청 패스가 처리됨.
// router객체의 route()메서드를 사용하여 요청패스를 지정. get, post함수를 이용하여 실행될 함수를 등록할 수 있음.
router.route("/process/login").post(function(req, res) {
  console.log("/process/login 처리함");

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>Param id : " + paramId + "</p></div>");
  res.write("<div><p>Param password : " + paramPassword + "</p></div>");
  res.end();
});

// 지정된 주소가 아닌 모든 페이지에 대한 오류 페이지 보여주기
app.all("*", function(req, res) {
  res.status(404).send("<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>");
});

// 라우터 객체를 app 객체에 등록.
app.use("/", router);

http.createServer(app).listen(3000, function() {
  console.log("Express 서버가 3000번 포트에서 시작됨.");
  console.log(path.join(__dirname, "public"));
});
