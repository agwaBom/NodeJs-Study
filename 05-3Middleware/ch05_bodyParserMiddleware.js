var express = require("express");
var http = require("http");
var path = require("path");

// bodyParser 설치
// npm install body-parser --save
// 클라이언트가 POST방식으로 요청할 때 본문 영역에 있는 요청 파라미터들을 파싱하여 요청 객체의 body속성에 넣어줌.
var bodyParser = require("body-parser");

// static 미들웨어 설치
// npm install serve-static --save

// 이렇게 이용할 수 있도록 함.
// /public/index.html       -> http://localhost:3000/index.html
// /public/images/house.png -> http://localhost:3000/images/house.png
// /public/js/main.js       -> http://localhost:3000/js/main.js
// /public/css/style.css    -> http://localhost:3000/css/style.css
var static = require("serve-static");

var app = express();

app.set("port", process.env.PORT || 3000);

// use메소드를 사용해 미들웨어를 설정
// bodyParser.urlencoded()메소드를 호출하면서 미들웨어를 설정하면 application/x-www-form-urlencoded 형식으로 전달된 요청 파라미터를 parsing할 수 있음.
app.use(bodyParser.urlencoded({ extended: false }));

// bodyParser.json() 메소드를 호출하면서 미들웨어을 설정하면 application/json 형식으로 전달될 요청 파라미터를 parsing할 수 있음.
app.use(bodyParser.json());

// static 미들웨어를 이용하여 특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 만들어줌.
// "" 부분은 "/a" 로 되어있는 경우에 localhost:3000/a/login.html 과 같은 방식으로 접근이 가능해짐
app.use("", express.static(path.join(__dirname, "public"))); // public폴더의 모든 파일을 웹서버의 루트패스로 접근할 수 있도록 함.

app.use(function(req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함.");

  // req.body.id - GET 방식으로 요청할 때
  // req.query.id - POST 방식으로 요청할 때
  // GET, POST방식으로 요청할 지 모를 때 -> req.body.id || req.query.id
  var paramId = req.body.id || req.query.id; // req객체의 body객체 안에 요청 파라미터들이 들어감.
  var paramPassword = req.body.password || req.query.password;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>Param id : " + paramId + "</p></div>");
  res.write("<div><p>Param password : " + paramPassword + "</p></div>");
  res.end();
  //res.end("<img src='/image/house.jpg' width='50%'>"); // public/images폴더에 들어있는 house.jpg 이미지 파일을 웹 브라우저에서 보려면 이렇게.
});

http.createServer(app).listen(3000, function() {
  console.log("Express 서버가 3000번 포트에서 시작됨.");
  console.log(path.join(__dirname, "public"));
});

// 단점
// 로그인 뿐이 아닌 다른 요청이 들어와도 use()메소드로 설정한 미들웨어 함수가 항상 호출되기 때문에 요청url이 무엇인지 일일이 확인해야 하는 번거로움이 있음.
// 요청 url을 일일히 확인하는 번거로운 문제를 해결하기 위해서 라우터 미들웨어(router middleware)임.
