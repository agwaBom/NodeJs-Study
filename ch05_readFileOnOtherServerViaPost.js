//얘는 아직 어렵넹
var http = require("http");

var opts = {
  host: "www.google.com", //Method Not Allowed뜨는 이유는 구글은 post요청을 받지 않기 때문임.
  port: 80,
  method: "POST",
  path: "/",
  headers: {}
};

var resData = "";
var req = http.request(opts, function(res) {
  //POST를 사용하려면 request()를 쓴다. 보안이슈가 있을때 사용함.
  //GET은 헤더에 요청정보를 보내고, POST는 바디에 요청정보를 보냄.
  res.on("data", function(chunk) {
    resData += chunk;
  });

  res.on("end", function() {
    console.log(resData);
  });
});

opts.headers["Content-Type"] = "application/x-www-form-urlencoded";
req.data = "q=actor";
opts.headers["Content-Length"] = req.data.length;

req.on("error", function(err) {
  console.log("오류 발생 : " + err.message);
});

//요청 전송
req.write(req.data);
req.end();
