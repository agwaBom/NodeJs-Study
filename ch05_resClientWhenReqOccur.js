// connection - 클라이언트가 접속하여 연결이 만들어질 떄 발생하는 이벤트.
// request - 클라이언트가 요청할 떄 발생하는 이벤트.
// close - 서버를 종료할 때 발생하는 이벤트.

var http = require("http");

var server = http.createServer();

var port = 3000;
server.listen(port, function() {
  console.log("웹 서버가 시작되었습니다. : %d", port);
});

server.on("connection", function(socket) {
  //연결이 만들어지면 Socket 객체가 socket 파라미터도 전달됨.
  //socket.address()를 통해서 클라이언트 IP와 port번호를 확인할 수 있다.
  var addr = socket.address();
  console.log("클라이언트가 접속했습니다. : %s, %d", addr.address, addr.port);
});

server.on("request", function(req, res) {
  //요청이 들어옴과 동시에 html스크립트를 respond해줌.
  console.log("클라이언트 요청이 들어왔습니다.");

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); //(statusCode, reasonPhrase, headers)
  res.write("<!DOCTYPE html>");
  res.write("<html>");
  res.write(" <head>");
  res.write("   <title>응답 페이지</title>"); //탭 제목
  res.write(" </head>");
  res.write(" <body>");
  res.write("   <h1>노드제이에스로부터의 응답 페이지</h1>"); //본문
  res.write(" </body>");
  res.write("</html>");
  res.end();
});

server.on("close", function() {
  console.log("서버가 종료됩니다.");
});
