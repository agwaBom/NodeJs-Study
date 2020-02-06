// on(event, listener) - 지정한 이벤트의 리스너를 추가합니다.
// once(event, listener) - 지정한 이벤트의 리스너를 추가하지만 한 번 실행한 후에는 자동으로 리스너가 제거됩니다.
// removeListener(event, listener) - 지정한 이벤트에 대한 리스너를 제거합니다.
// emit() - 이벤트를 다른 쪽으로 전달.
process.on("exit", function() {
  console.log("exit 이벤트 발생함.");
}); //종료 이벤트가 발생하면 리스너에서 console.log를 실행함.

setTimeout(function() {
  console.log("2초 후에 시스템 종료 시도함.");
  process.exit();
}, 2000); //2초 후 시스템을 종료함.

process.on("tick", function(count) {
  console.log("tick 이벤트 발생함 : %s", count);
}); //listener에서 tick이벤트 감지 후 console.log출력.

setTimeout(function() {
  console.log("2초 후에 tick이벤트 전달 시도함.");
  process.emit("tick", "2"); //tick 이벤트를 count = 2와 함께 전달.
}, 2000); //2초 뒤 실행.
