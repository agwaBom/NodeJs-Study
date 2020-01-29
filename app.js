const http = require("http"); //http 모듈 로딩하여 http변수에 할당

//createServer 메서드를 이용하여 HTTP서버 객체를 생성.
//HTTP서버 객체는 EventEmitter Class를 상속받았다.
//HTTP request 이벤트가 발생할 때, 한번씩 request listener 함수가 한번씩 호출됨.
http
  .createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("hello world");
  })
  .listen(3000); //createServer이 반환한 HTTP Server객체의 listen 메서드에 port#3000을 전달하여 서버 실행.

console.log("Server is running at http://127.0.0.1:3000");

const circle = require("./circle.js"); //circle.js를 import
console.log(`지름이 4인 원의 면적 : ${circle.area(4)}`);
console.log(`${circle.circumference(4)}`);
console.log(circle.area(5));

const value = require("./primitive");
console.log(value);
