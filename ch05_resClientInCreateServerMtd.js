// connection - 클라이언트가 접속하여 연결이 만들어질 떄 발생하는 이벤트.
// request - 클라이언트가 요청할 떄 발생하는 이벤트.
// close - 서버를 종료할 때 발생하는 이벤트.

var http = require("http");
// res객체를 사용하여 응답을 보낼때 사용하는 메서드
// writeHead(statusCode, statusMessage, headers) - 응답으로 보낼 헤더를 만듬.
// write(chunk, encoding, callback) - 응답 본문 데이터를 만듬. 여러번 호출될 수 있음.
// end(data, encoding, callback) - 클라이언트로 응답을 전송. 파라미터에 데이터가 들어있으면 해당 데이터도 함께 응답으로 전송함.
var server = http.createServer(function(req, res) {
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

server.on("close", function() {
  console.log("서버가 종료됩니다.");
});
