var express = require("express");
var http = require("http");
var path = require("path");

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var static = require("serve-static");
var errorhandler = require("errorhandler");

var expressErrorHandler = require("express-error-handler");

var expressSession = require("express-session");

// use passport
var passport = require("passport");
var flash = require("connect-flash");

var config = require("./config/config");

var database = require("./database/database");

var route_loader = require("./routes/route_loader");

var app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
console.log("뷰 엔진이 ejs로 설정되었습니다.");

console.log("config.server_port : %d", config.server_port);
app.set("port", process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(
  expressSession({
    secret: "my_key",
    resave: true,
    saveUninitialized: true
  })
);

// passport 사용 설정
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var router = express.Router();
route_loader.init(app, router);

var configPassport = require("./config/passport");
userPassport(router, passport);

var errorHandler = expressErrorHandler({
  static: {
    "404": "./public/404.html"
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

process.on("uncaughtException", function(err) {
  console.log("uncaughtException 발생됨");
  console.log("서버 프로세스 종료하지 않고 유지함");
  console.log(err.stack);
});

process.on("SIGTERM", function() {
  console.log("프로세스가 종료됩니다.");
  app.close();
});

app.on("close", function() {
  console.log("MySQL 서버 종료됩니다.");
  if (database.db) {
    database.db.close();
  }
});

var server = http.createServer(app).listen(app.get("port"), function() {
  console.log("서버가 시작되었습니다. port : " + app.get("port"));
  database.init(app, config);
  database.init();
});
