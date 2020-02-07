var winston = require("winston"); //로그 처리
var winstonDaily = require("winston-daily-rotate-file"); //로그 일별 처리
var moment = require("moment"); //시간 처리

function timeStampFormat() {
  return moment().format("YYYY-MM-DD HH:mm:ss.SSS ZZ");
  //ex) 2016-05-12 20:13:22.500 +0900
}

var logger = winston.createLogger({
  //winston.Logger은 생성자가 아니기 때문에 winston.createLogger을 하는것이 맞음
  transports: [
    new winstonDaily({
      name: "info-file",
      filename: "./log/server",
      datePattern: "_yyyy-MM-dd.log",
      colorize: false,
      maxsize: 50000000, //50mb가 넘어가면 새로운 파일 생성.
      maxFiles: 1000, //1000개의 파일까지 자동생성이 가능
      level: "info", //Log Level debug:0 > info:1 > notice:2 > warning:3 > error:4 > crit:5 > alert:6 > emerg:7
      showLevel: true,
      json: false,
      timestamp: timeStampFormat
    }),
    new winston.transports.Console({
      name: "debug-console",
      colorize: true, //컬러 적용
      level: "debug",
      showLevel: true,
      json: false,
      timestamp: timeStampFormat
    })
  ],
  exceptionHandlers: [
    new winstonDaily({
      name: "exception-file",
      filename: "./log/exception",
      datePattern: "_yyyy-MM-dd.log",
      colorize: false,
      level: "error",
      showLevel: true,
      json: false,
      timestamp: timeStampFormat
    }),
    new winston.transports.Console({
      name: "exception-console",
      colorize: true,
      level: "debug",
      showLevel: true,
      json: false,
      timestamp: timeStampFormat
    })
  ]
});
