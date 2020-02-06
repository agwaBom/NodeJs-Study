var fs = require("fs");
var inname = "./output.txt";
var outname = "./output2.txt";

fs.exists(outname, function(exists) {
  //file이 존재하는지 우선 체크
  if (exists) {
    fs.unlink(outname, function(err) {
      //만약 기존에 output2파일이 있다면 삭제함.
      if (err) throw err;
      console.log("기존 파일 [" + outname + "] 삭제함.");
    });
  }
  var infile = fs.createReadStream(inname, { flags: "r" });
  var outfile = fs.createWriteStream(outname, { flags: "w" });
  infile.pipe(outfile); //pipe 메서드를 이용해서 두개의 스트림 객체를 연결
  console.log("파일 복사[" + inname + "] -> [" + outname + "]"); //연결만 해도 파일 내용이 복사된다.
});
