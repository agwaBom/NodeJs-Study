var mysql = require("mysql");
var Sequelize = require("sequelize");
var sequelize = new Sequelize("mobileServer", "root", "password", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  pool: {
    max: 10,
    min: 0,

    debug: false,
    insecureAuth: true
  }
});

// var pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "mobileServer",
//   debug: false,
//   insecureAuth: true
// });

function createSchema(app, config) {
  var schemaLen = config.db_schemas.length; // 아직 정의 안됨.
  console.log("설정에 정의된 스키마의 수 : %d", schemaLen);

  for (var i = 0; i < schemaLen; i++) {
    var curItem = config.db_schemas[i];

    var curSchema = require(curItem.file).createSchema(mongoose);
    var curModel = mongoose.model(curItem.collection, curSchema);
    console.log("%s 컬렉션을 위해 모델 정의함.", curItem.collection);

    database[curItem.schemaName] = curSchema;
    database[curItem.modelName] = curModel;
    console.log(
      "스키마 이름 [%s], 모델 이름 [%s]이 database 객체의 속성으로 추가됨.",
      curItem.modelName
    );
  }
  app.set("database", database);
  console.log("database 객체가 app 객체의 속성으로 추가됨.");
}

module.exports = database;
