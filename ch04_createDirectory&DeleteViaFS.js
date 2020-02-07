var fs = require("fs");

fs.mkdir("./docs", 0666, function(err) {
  //디렉터리를 비동기 방식으로 생성 0666의 의미는?
  if (err) throw err;
  console.log("새로운 docs 폴더를 만들었습니다.");
  fs.rmdir("./docs", function(err) {
    //비동기 방식으로 디렉터리를 삭제.
    if (err) throw err;
    console.log("docs 폴더를 삭제했습니다.");
  });
});
