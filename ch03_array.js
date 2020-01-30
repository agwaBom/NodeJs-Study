var Users = [
  { name: "소녀시대", age: 20 },
  { name: "걸스데이", age: 22 }
];
//array에서 push 메서드를 이용해서 Users에 정보를 집어넣음
Users.push({ name: "티아라", age: 23 });

console.log("사용자 수 : %d", Users.length);
console.log("첫 번째 사용자 이름 : %s", Users[0].name);

var add = function(a, b) {
  return a + b;
};

Users.push(add);

console.log("배열 요소의 수 : %d", Users.length); // .length를 이용해서 array의 개수를 반환 받음
console.log("세 번쨰 요소로 추가된 함수 실행: %d", Users[2](10, 10)); // array에 들어간 함수를 호출하여 실행시킬 수 있다.

//순차적으로 배열의 요소에 접근
for (var i = 0; i < Users.length; i++) {
  console.log("배열의 요소 #" + i + " : %s", Users[i].name);
}

//forEach문을 사용해서 배열의 요소에 하나씩 접근할 수 있다.
//forEach를 실행할때 자동으로 function의 첫 파라미터에는 배열의 요소, 두번째에는 해당 요소의 index값이 들어가게 된다.
Users.forEach(function(item, index) {
  console.log("배열 요소 #" + index + " : %s", item.name);
});

/*
배열의 값 추가 및 삭제
push(object) - 배열의 끝에 요소를 추가
pop() - 배열의 끝의 요소를 삭제
unshift(object) - 배열 앞에 요소를 추가
shift() - 배열 앞의 요소를 삭제
splice(index, removeCount, [Object]) - 여러개의 객체를 요소로 추가 || 삭제
slice(index, copyCount) - 여러 개의 요소를 잘라내어 새로운 배열 객체로 만듦.
*/
console.log("push 호출 전 배열의 개수 : %d", Users.length);
Users.push({ name: "티아라", age: 23 });
console.log("push 호출 후 배열의 개수 : %d", Users.length);
Users.pop();
console.log("pop 호출 후 배열의 개수 : %d", Users.length);
Users.unshift({ name: "티아라", age: 23 });
console.log("unshift 호출 후 배열의 개수 : %d", Users.length);
Users.shift();
console.log("shift 호출 후 배열의 개수 : %d", Users.length);

delete Users[1]; //delete를 이용하여 특정 배열의 요소를 삭제할 수 있다.
console.dir(Users); //삭제 됨을 확인.
console.log("남은 배열의 개수 : %d", Users.length); // 배열의 수는 줄어들지 않았음. 빈 공간인채로 삭제된 곳이 남아있기 때문.

//공간까지 없얘기 위해서 splice메서드를 사용.
Users.splice(1, 0, { name: "애프터스쿨", age: 25 }); // 배열의 1번째 값에 0개를 지우고 애프터스쿨 object를 넣어라.
console.log("splice()로 요소를 인덱스 1에 추가한 후");

//slice를 이용하여 기존 배열에서 일부의 요소를 복사
var slicedUsers = Users.slice(0, 2); // 0 <= 복사될 요소 < 2
var anotherSlicedUser = Users.slice(1); //이렇게 하나의 요소만 복사하여 할당할 수 있음.
