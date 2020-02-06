// parse() - 주소 문자열을 파싱하여 URL객체를 만들어줌
// formats() - URL객체를 주소 문자열로 변환

var url = require("url"); //url모듈 load

//주소 문자열을 URL 객체로 변환
var curURL = url.parse(
  "https://m.search.naver.com/search.naver?query=steve+jobs&where=m&sm=mtp_hty"
);

//URL객체를 주소 문자열로 변환
var curStr = url.format(curURL);

console.log("주소 문자열 : %s", curStr);
console.dir(curURL);

//url객체의 query속성의 문자열을 각각의 parameter로 분리하기 위해 querystring을 사용.
// parse() - 요청 파라미너 문자열을 파싱하여 요청 파라미터 객체로 만들어 줍니다.
// stringify() - 요청 파라미터 객체를 문자열로 변환합니다.
var querystring = require("querystring");
var param = querystring.parse(curURL.query); //curURL객체의 query속성을 querystring을 이용하여 파싱.

console.log("요청 파라미터 중 query의 값 : %s", param.query); //parsing을 거친 curURL의 query속성.
console.dir(param); //param Object의 전문.
console.log("원본 요청 파라미터 : %s", querystring.stringify(param)); //param객체를 .stringify를 통하여 원래의 파라미터 문자열로 돌릴 수 있다.
