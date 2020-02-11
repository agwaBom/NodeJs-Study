var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var static = require("serve-static");
var expressErrorHandler = require("express-error-handler");

var cookieParser = require("cookie-parser");

var app = express();
var router = express.Router(); // 라우터 객체 참조

app.set("port", process.env.PORT || 3000);
app.use(cookieParser()); //cookieParser 미들웨어를 사용하도록 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("", express.static(path.join(__dirname, "public")));

// 라우팅 미들웨어의 get함수를 호출하여 /process/showCookie 패스를 처리하는 콜백함수 등록
router.route("/process/showCookie").get(function(req, res) {
  console.log("/process/showCookie 호출됨");
  // cookies 객체에 클라이언트 쿠키정보가 들어있음.
  // 사용자가 응답문서를 조회할 때, 쿠키 정보를 볼 수 있도록 쿠키 객체를 응답으로 보냄. -> 클라이언트에서 쿠기객체를 전달받게됨.
  res.send(req.cookies);
});

// 라우팅 미들웨어의 get함수를 호출하여 /process/setUserCookie 패스를 처리하는 콜백함수 등록
router.route("/process/setUserCookie").get(function(req, res) {
  console.log("/process/setUserCookie 호출됨.");
  //cookie()를 이용하여 user쿠키를 추가.
  res.cookie("user", {
    id: "mike",
    name: "소녀시대",
    authorized: true
  }); // -> 쿠키가 클라이언트 웹 브라우저에 설정되게됨.

  //redirect()를 이용하여 showCookie의 패스로 재요청함으로 인해 정보가 그대로 클라이언트 웹 브라우저에 표시됨.
  res.redirect("/process/showCookie");
});

router.route("/process/login/:id").post(function(req, res) {
  console.log("/process/login/:id 처리함");

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>Param id : " + paramId + "</p></div>");
  res.write("<div><p>Param password : " + paramPassword + "</p></div>");
  res.end();
});

router.route("/process/users/:id").get(function(req, res) {
  console.log("/process/users/:id 처리함.");

  var paramId = req.params.id;

  console.log("/process/users와 토큰 %s를 이용해 처리함.", paramId);
  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>Param id : " + paramId + "</p></div>");
  res.end();
});

// 라우터 객체를 app 객체에 등록.
// 에러 핸들러 위에 있어야지 router.route()에 있는 코드가 실행될 수 있다.
// 등록을 하고 나서 해당 route가 있는지 없는지 에러가 확인할 수 있기 때문임.
// 에러 관련 코드가 먼저 (use)실행된다면 해당 코드는 router에 해당 경로가 등록되지 않을 것으로 판단하므로 404.html을 출력하게 됨.(뇌피셜)
app.use("/", router);

var errorHandler = expressErrorHandler({
  static: {
    // errorHandler에 대해 404오류 발생시 /public/404.html을 열게함.
    "404": "05-3Middleware/public/404.html"
  }
});

app.use(expressErrorHandler.httpError(404)); // expressErrorHandler 모듈의 httpError(404)을 등록.
app.use(errorHandler); // errorHandler을 등록

http.createServer(app).listen(3000, function() {
  console.log("Express 서버가 3000번 포트에서 시작됨.");
  console.log(path.join(__dirname, "public"));
});
