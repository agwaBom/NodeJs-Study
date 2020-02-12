// Multer을 이용하여 다양한 확장자의 파일들을 업로드할 수 있음.
// load Express와 기본 모듈
var express = require("express");
var http = require("http");
var path = require("path");
// load Express Middleware
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var static = require("serve-static");
//var errorHandler = require("errorhandler");
// load Express Error handler
var expressErrorHandler = require("express-error-handler");
// load session Middleware
var expressSession = require("express-session");
// load file upload Middleware
// Multer의 속성
// destination - 업로드한 파일이 저장될 폴더를 지정
// filename - 업로드한 파일의 이름을 바꿈
// limits - 파일 크기나 파일 개수 등의 제한 속성을 설정.
var multer = require("multer");
// 파일 업로드 후 핸들링을 하기 위하여 fs 불러옴.
var fs = require("fs");
// client에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원
// 일반적으로 서버에서 로딩된 페이지만 접근할 수 있지만, cors를 이용하면 로딩이 되지 않은 서버로도 접근이 가능함.(?)
var cors = require("cors");

// 익스프레스 객체 생성
var app = express();
// port번호 설정
app.set("port", process.env.PORT || 3000);
// bodyParser을 이용하여 application/x-www-form-urlencoded을 parsing
app.use(bodyParser.urlencoded({ extended: false }));
// bodyParser을 이용하여 application/json을 parsing
app.use(bodyParser.json());
// public, upload 폴더를 open
app.use("/public", static(path.join(__dirname, "public")));
app.use("/uploads", static(path.join(__dirname, "uploads")));

// cookieParser을 설정
app.use(cookieParser());

// Setting a Session
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true
  })
);
// supports CORS when clients requested with ajax(?)
app.use(cors());

// use Multer Middleware: 미들웨어의 사용 순서가 중요함. body-parser -> multer -> router
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    // 그냥 "uploads"를 하게되면 roots/uploads가 되어버려서 존재하지 않는 파일이 되어버림
    // callback function을 써야하는 이유는 documentation이 그렇게 하라고 시킨 것임.
    callback(null, path.join(__dirname, "uploads"));
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname + Date.now());
  }
});
// 한번에 업로드할 수 있는 파일을 10개, 1Mb로 제한함.
var upload = multer({
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024
  }
});
// 라우터를 사용하여 라우팅 함수를 등록함.
var router = express.Router();

router
  .route("/process/photo")
  // upload.array(fieldname, maximum number of files to process )
  // photo.html 파일의 <input type="file" name="photo" /> input tag의 name과 같은 이름이 fieldname에 들어가야함.
  .post(upload.array("photo", 1), function(req, res) {
    console.log("/process/photo 호출됨");

    try {
      // request된 파일의 전체를 files에 할당
      var files = req.files;
      console.dir("#===== 업로드된 첫번째 파일 정보 =====#");
      // 처음 업로드된 파일의 정보
      console.dir(req.files[0]);
      console.dir("#=====#");

      // 현재의 파일 정보를 저장할 변수 선언
      var originalname = "";
      var filename = "";
      var mimetype = "";
      var size = 0;

      // 배열에 파일이 들어가있는지 확인.
      if (Array.isArray(files)) {
        console.log("배열에 들어있는 파일의 갯수 : %d", files.length);
        for (var index = 0; index < files.length; index++) {
          // 파일의 각 정보를 가져올 수 있다.
          originalname = files[index].originalname;
          filename = files[index].filename;
          mimetype = files[index].mimetype;
          size = files[index].size;
        }
      } else {
        // 배열에 파일이 들어있지 않은 경우.
        console.log("파일 갯수 : 1");

        originalname = files[index].originalname;
        filename = files[index].filename;
        mimetype = files[index].mimetype;
        size = files[index].size;
      }

      console.log(
        "현재 파일 정보 : " +
          originalname +
          ", " +
          filename +
          ", " +
          mimetype +
          ", " +
          size
      );
      // 클라이언트에게 응답을 전송
      res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
      res.write("<h3>파일 업로드 성공</h3>");
      res.write("<hr/>");
      res.write(
        "<p>원본 파일 이름 : " +
          originalname +
          " -> 저장 파일명: " +
          filename +
          "</p>"
      );
      res.write("<p>Mime Type : " + mimetype + "</p>");
      res.write("<p>파일 크기 : " + size + "</p>");
      res.end();
    } catch (err) {
      console.dir(err.stack);
    }
  });

app.use("/", router);

http.createServer(app).listen(3000, function() {
  console.log("서버 시작");
  console.log(path.join(__dirname, "uploads"));
});
