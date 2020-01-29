// 시스템 정보를 알려주는 os 모듈

// hostname() - 운영체제의 호스트 이름을 알려줌
// totalmem() - 시스템 전체 메모리 용량을 알려줌
// freemem() - 시스템에서 사용 가능한 메모리 용량을 알려줌
// cpus() - CPU정보를 알려줌
// networkInterfaces() - 네트워크 인터페이스 정보를 담은 배열 객체를 반환

var os = require("os");

console.log("시스템의 hostname : %s", os.hostname());
console.log("시스템의 메모리 : %d / %d", os.freemem(), os.totalmem());
console.log("시스템의 CPU정보\n");
console.dir(os.cpus());
console.log("시스템의 네트워크 인터페이스 정보\n");
console.dir(os.networkInterfaces());

//파일 패스를 다루는 os 모듈

// join() - 여러 개의 이름들을 모두 합쳐 하나의 파일 패스로 만들어줌
// dirname() - 파일 패스에서 디렉토리 이름을 반환
// basename() - 파일 패스에서 파일의 확장자를 제외한 이름을 반환
// extname() - 파일 패스에서 파일의 확장자를 반환

var path = require("path");

//디렉터리 이름 합치기
var directories = ["users", "mike", "docs"];
var docsDirectory = directories.join(path.sep); // join연산을 이용하여 Strings들을 합침. path.sep(/)으로 구분
console.log("문서 디렉터리 : %s", docsDirectory);

// 디렉터리 이름과 파일 이름 합치기
var curPath = path.join("/Users/mike", "notepade.exe");
console.log("파일 패스 : %s", curPath); // path를 이용해 join을 하면 중간에 path.sep이 자동으로 추가됨.

// 패스에서 디렉터리, 파일 이름, 확장자 구별하기.
var filename = "/Users/mike/notepad.exe";
var dirname = path.dirname(filename);
var basename = path.basename(filename);
var extname = path.extname(filename);

console.log(
  "디렉터리 : %s, 파일 이름 : %s, 확장자 : %s",
  dirname,
  basename,
  extname
);
