var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var static = require("serve-static");
// express-error-handler을 import.
// 특정 오류 코드에 따라 클라이언트로 응답을 보내 줄 때 미리 만들어 놓은 웹문서를 보내 줄 수 있음.
var expressErrorHandler = require("express-error-handler");

var app = express();
var router = express.Router(); // 라우터 객체 참조

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("", express.static(path.join(__dirname, "public")));

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

var errorHandler = expressErrorHandler({
  static: {
    // errorHandler에 대해 404오류 발생시 /public/404.html을 열게함.
    "404": "05-3Middleware/public/404.html"
  }
});

app.use(expressErrorHandler.httpError(404)); // expressErrorHandler 모듈의 httpError(404)을 등록.
app.use(errorHandler); // errorHandler을 등록

// 라우터 객체를 app 객체에 등록.
app.use("/", router);

http.createServer(app).listen(3000, function() {
  console.log("Express 서버가 3000번 포트에서 시작됨.");
  console.log(path.join(__dirname, "public"));
});
