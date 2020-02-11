//HTTP 클라이언트는 GET, POST를 이용하여 다른 웹 서버에 데이터를 요청할 수 있다.

var http = require("http");

var options = {
  host: "www.google.com",
  port: 80,
  path: "/"
};

var req = http.get(options, function(res) {
  //원하는 정보를 options에게 요청한다.
  //get메소드를 사용하면 다른 사이트에 요청을 보내고 응답을 받아 처리할 수 있다.
  var resData = "";
  res.on("data", function(chunk) {
    //데이터가 들어오기 시작하면 chunk데이터를 resData에 계속 쌓음.
    resData += chunk;
  });

  res.on("end", function() {
    //end이벤트가 발생하면 응답된 resData를 출력함.
    console.log(resData);
  });
});

req.on("error", function(err) {
  console.log("오류 발생: " + err.message);
});
