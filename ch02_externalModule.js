var nconf = require("nconf"); //외부에서 가져오는 모듈이기 때문에 경로를 지정하지 않고 이름으로 불러온다.

nconf.env(); // 환경변수에 대한 정보를 가져와서 속성으로 보관.

console.log("OS 환경 변수의 값 : %s", nconf.get("OS"));
