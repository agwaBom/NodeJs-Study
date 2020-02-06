// createReadStream(path, option) - 파일을 읽기 위한 스트림 객체를 만듦
// createWriteStream(path, option) - 파일을 쓰기 위한 스트림 객체를 만듦
var fs = require("fs");

//flags..
// 'a': Open file for appending. The file is created if it does not exist.
// 'ax': Like 'a' but fails if the path exists.
// 'a+': Open file for reading and appending. The file is created if it does not exist.
// 'ax+': Like 'a+' but fails if the path exists.
// 'as': Open file for appending in synchronous mode. The file is created if it does not exist.
// 'as+': Open file for reading and appending in synchronous mode. The file is created if it does not exist.
// 'r': Open file for reading. An exception occurs if the file does not exist.
// 'r+': Open file for reading and writing. An exception occurs if the file does not exist.
// 'rs+': Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.
// This is primarily useful for opening files on NFS mounts as it allows skipping the potentially stale local cache. It has a very real impact on I/O performance so using this flag is not recommended unless it is needed.
// This doesn't turn fs.open() or fsPromises.open() into a synchronous blocking call. If synchronous operation is desired, something like fs.openSync() should be used.
// 'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
// 'wx': Like 'w' but fails if the path exists.
// 'w+': Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
// 'wx+': Like 'w+' but fails if the path exists.
var infile = fs.createReadStream("./output.txt", { flags: "r" }); //output.txt를 읽어서
var outfile = fs.createWriteStream("./output2.txt", { flags: "w" }); //output2.txt로 내보낸다.

infile.on("data", function(data) {
  //읽기 스트림에서 리스너 생성해둠 리스너가 실행됨과 함께 function이 실행됨.
  //data 이벤트 발생시, 실행
  console.log("읽어 들인 데이터", data);
  outfile.write(data); //data 쓰기
});

infile.on("end", function() {
  //end 이벤트 발생시 실행.
  console.log("파일 읽기 종료.");
  outfile.end(function() {
    console.log("파일 쓰기 종료.");
  });
});
