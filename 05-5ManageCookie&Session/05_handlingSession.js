// 세션을 이용하여 유저의 상태정보를 저장후 로그아웃시 삭제
// chrome의 f12에 있는 console에서 application탭에서 cookies에서 connect.sid에 사용자가 로그인이 되어있으면 정보가 등록되어있는 것을 확인할 수 있다.
var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var static = require("serve-static");
var expressErrorHandler = require("express-error-handler");

var cookieParser = require("cookie-parser");
// express-session 모듈을 불러옴
var expressSession = require("express-session");

var app = express();
var router = express.Router();

app.set("port", process.env.PORT || 3000);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(cookieParser());
// use()를 이용하여 미들웨어에서 expressSession을 추가함.
app.use(
  expressSession({
    secret: "my key",
    resave: true, // ?
    saveUninitialized: true // ?
  })
);

router.route("/process/product").get(function(req, res) {
  console.log("/process/product 호출됨");

  // user 세션의 유무에 따라서 redirect경로를 지정해줌.
  if (req.session.user) {
    res.redirect("/public/product.html");
  } else {
    res.redirect("/public/login2.html");
  }
});

router.route("/process/login").post(function(req, res) {
  console.log("/process/login 호출됨.");

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  if (req.session.user) {
    // 이미 로그인이 된 상태면.
    console.log("이미 로그인되어 상품 페이지로 이동합니다.");
    res.redirect("/public/product.html");
  } else {
    // 처음 온 유저라면 user객체에 세션 저장
    req.session.user = {
      id: paramId,
      name: "소녀시대",
      authorized: true
    };

    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<h1>로그인 성공</h1>");
    res.write("<div><p>Param id: " + paramId + "</p></div>");
    res.write("<div><p>Param password: " + paramPassword + "</p></div>");
    res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
    res.end();
  }
});

// 로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제
router.route("/process/logout").get(function(req, res) {
  console.log("/process/logout 호출됨");

  // 로그아웃이 호출되고 유저의 세션이 존재한다면
  if (req.session.user) {
    console.log("로그아웃 합니다");
    req.session.destroy(function(err) {
      // 해당 유저의 세션을 삭제
      if (err) {
        throw err;
      }
      console.log("세션을 삭제하고 로그아웃 하였습니다.");
      res.redirect("/public/login2.html"); // 로그인 페이지로 돌아감.
    });
  } else {
    // 로그인이 된 상태가 아니였다면
    console.log("로그인 된 상태가 아닙니다.");
    // 로그인 페이지로 돌아감.
    res.redirect("/public/login2.html");
  }
});

router.route("/process/showCookie").get(function(req, res) {
  console.log("/process/showCookie 호출됨");
  res.send(req.cookies);
});

router.route("/process/setUserCookie").get(function(req, res) {
  console.log("/process/setUserCookie 호출됨.");
  res.cookie("user", {
    id: "mike",
    name: "소녀시대",
    authorized: true
  });
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

app.use("/", router);

var errorHandler = expressErrorHandler({
  static: {
    "404": "05-3Middleware/public/404.html"
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function() {
  console.log("Express 서버가 3000번 포트에서 시작됨.");
  console.log(path.join(__dirname, "public"));
});
