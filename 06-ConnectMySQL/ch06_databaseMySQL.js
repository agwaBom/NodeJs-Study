// express basic module
var express = require("express");
var http = require("http");
var path = require("path");
// express middleware module
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var static = require("serve-static");
var errorHandler = require("errorhandler");
// express error handler module
var expressErrorHandler = require("express-error-handler");
// express session module
var expressSession = require("express-session");
// aquire mysql module to handle database in MySQL
var mysql = require("mysql");
// setting connection of MySQL database
// 관계형 데이터베이스에서는 데이터베이스 연결시에 connection pool이라고 함.
var pool = mysql.createPool({
  // createPool()을 이용하여 pool을 생성했으니 pool 객체에서 연결객체를 가져와서 사용할 수 있다.
  connectionLimit: 10, // connection pool에서 만들 수 있는 최대 연결 개수.
  host: "localhost", // 연결할 호스트 이름(address)
  user: "root", // 데이터베이스 사용자 아이디 (default : root)
  // port : 데이터베이스가 사용하는 포트번호 (default : 3306)
  password: "password", // 데이터베이스 사용자 비밀번호
  database: "new_schema", // 데이터베이스의 이름
  debug: false, // 데이터베이스 처리과정을 로그로 남길 것인지?
  insecureAuth: true // Autorization 방식이 최신이 아니라도 통과시킴.
});
// adding a new user account
var addUser = function(id, name, age, password, callback) {
  console.log("addUser 호출됨.");
  // get a connection object from connection pool
  pool.getConnection(function(err, conn) {
    if (err) {
      if (conn) {
        // if there is ongoing pool connection
        conn.release(); // must be released
      }
      callback(err, null);
      return;
    }
    console.log("데이터베이스 연결 스레드 아이디 : " + conn.threadId);

    // aqire user data with object
    var data = { id: id, name: name, age: age, password: password };
    // execute SQL query
    // ? is a parameter where data object will be queried
    var exec = conn.query("insert into users set ?", data, function(
      err,
      result
    ) {
      conn.release(); // query끝나면 connection을 release함.
      console.log("실행 대상 SQL: " + exec.sql);

      // when error occured while executing SQL
      if (err) {
        console.log("SQL 실행 시 오류 발생함.");
        console.dir(err); // show detailed information about error

        callback(err, null);
        return;
      }

      callback(null, result);
    });
  });
};
// make new express object
var app = express();
// setting port
app.set("port", process.env.PORT || 3000);
// parse application/x-www-form-urlencoded, application/json using body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// maker /public folder static
app.use("/public", static(path.join(__dirname, "public")));
// set cookie-parser
app.use(cookieParser());
// set session
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true
  })
);
// reference router object
var router = express.Router();

// process to /process/adduser router when send button is pressed in adduser2.html
router.route("/process/adduser").post(function(req, res) {
  console.log("/process/adduser 호출됨.");
  // whether requested with POST or GET
  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;
  var paramName = req.body.name || req.query.name;
  var paramAge = req.body.age || req.query.age;

  console.log(
    "요청 파라미터 : " +
      paramId +
      ", " +
      paramPassword +
      ", " +
      paramName +
      ", " +
      paramAge
  );
  // if pool object is reseted, call addUser function to add user information
  if (pool) {
    addUser(paramId, paramName, paramAge, paramPassword, function(
      err,
      addUser
    ) {
      // if there is error while adding new user information, send error information to client
      if (err) {
        console.error("사용자 추가 중 오류 발생 : " + err.stack);

        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h2>사용자 추가 중 오류 발생</h2>");
        res.write("<p>" + err.stack + "</p>");
        res.end();

        return;
      }
      // if there is returned object(addUser successed)
      if (addUser) {
        console.dir(addUser);
        console.log("inserted " + addUser.affectedRows + " rows");

        var insertId = addUser.insertId;
        console.log("추가한 레코드의 아이디: " + insertId);

        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h2>사용자 추가 성공</h2>");
        res.end();
      } else {
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h2>사용자 추가 실패</h2>");
        res.end();
      }
    });
  } else {
    // if database object is not reseted, return fail.
    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<h2>데이터베이스 연결 실패</h2>");
    res.end();
  }
});
// apply router object
app.use("/", router);
// handles 404 error page
var errorHandler = expressErrorHandler({
  static: {
    "404": "06-ConnectMySQL/public/404.html"
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get("port"), function() {
  console.log("서버가 시작되었습니다 포트 : " + app.get("port"));
  console.log(path.join(__dirname, "public"));
});
