// set(name, value) - 서버 설정을 위한 속성을 지정. set()메서드로 지정한 속성은 get()으로 꺼내쓸 수 있다.
// get(name, value) - 설정된 서버의 속성을 꺼내옴.
// use(path, function()) - 미들웨어 함수 사용
// get(path, function()) - 특정 패스로 요청된 정보를 처리(?)

// set()의 name에서 속성이름이 미리 정해진 경우 사용.
// env - 서버 모드를 설정
// view - 뷰들이 들어있는 폴더/폴더 배열을 설정
// view engine - 디폴트로 사용할 뷰 엔진을 설정(클라이언트에 보낼 응답 웹 문서를 만들 때, 사용됨)
// 뷰 엔진에는 여러 템플릿이 있는데 그 종류를 결정할 수 있다.

var express = require("express"); //npm install express --save
var http = require("http");

var app = express(); // 익스프레스 서버 객체 생성

// 만들어놓은 app객체에 기본포트 3000을 속성으로 설정.
// app객체에 정의된 함수 set()을 호출
app.set("port", process.env.PORT || 3000); // process.env에 PORT속성이 있는 경우 해당 포트를 사용하고 없으면 3000번으로 설정.

//express 시작
//http.create..(app)의 listen메서드를 이용하여 클라이언트 대기(서버 실행)
//기존의 createServer로 웹서버 객체를 만들어 listen()으로 클라이언트 대기 요청을 하는데에 비해서 코드가 짧아짐
http.createServer(app).listen(app.get("port"), function() {
  console.log("익스프레스 서버가 시작됨: " + app.get("port"));
});
