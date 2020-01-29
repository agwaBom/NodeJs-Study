//circle.js는 독립적인 파일 스코프를 갖는 모듈
const { PI } = Math;
exports.area = r => PI * r * r;
exports.circumference = r => 2 * PI * r; // area와 circumference를 exports 객체의 메소드로 정의함.
//결론적으로 PI는 circle모듈에서만 유효한 private
//area, circumference는 외부로 공개하게 됨.
