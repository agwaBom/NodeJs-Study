var fs = require("fs");
var http = require("http");

var server = http.createServer(function(req, res) {
  //파일을 스트림으로 읽어들임
  var instream = fs.createReadStream("./output.txt");
  //읽은 파일을 pipe를 이용하여 response로 전송
  instream.pipe(res);
});
server.listen(7001, "127.0.0.1");
