var output = "안녕1 !";
var buffer1 = new Buffer.alloc(10); //버퍼의 크기를 지정 Buffer(size)는 보안문제로 더 이상 사용 권장 x
var len = buffer1.write(output, "utf8"); //utf8로 output에 있는 값을 입력.
console.log("첫 번째 버퍼의 문자열 : %s\n", buffer1.toString());

var buffer2 = new Buffer.from("안녕2 !", "utf8"); //버퍼에 직접적으로 문자열을 입력 Buffer(string, type)은 보안문제로 사용 권장 X
console.log("두 번째 버퍼의 문자열 : %s", buffer2.toString());

console.log("버퍼 객체의 타입 : %s", Buffer.isBuffer(buffer1)); //버퍼인지 타입 확인.

var byteLen = Buffer.byteLength(output); //output의 값을 버퍼의 byte값으로 계산하여 그 길이를 bytelen에 넣음

//버퍼 객체에 들어있는 문자열 데이터를 문자열 변수로 만듦.
var str1 = buffer1.toString("utf8", 0, byteLen); //(encoding, start, end)
var str2 = buffer2.toString("utf8");

//첫 번째 buffer 객체 문자열을 두 번쨰 buffer 객체로 복사
buffer1.copy(buffer2, 0, 0, byteLen); // (targetBuffer, targetStart, sourceStart, sourceEnd)
console.log("두 번째 버퍼에 복사한 후의 문자열 : %s", buffer2.toString("utf8"));

//두 개의 버퍼를 concat을 이용하여 합침
buffer3 = Buffer.concat([buffer1, buffer2]);

console.log("두 개의 버퍼를 붙인 후의 문자열 : %s", buffer3.toString("utf8")); //왜 두 개가 합해진 상태로 출력되는게 아닌거지.
