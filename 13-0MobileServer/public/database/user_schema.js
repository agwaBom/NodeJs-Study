var crypto = require("crypto");

var Schema = {};

Schema.createSchema = function(mongoose) {
  var UserSchema = mongoose.Schema({
    email: { type: String, default: "" },
    hashed_password: { type: String, required: true, default: "" },
    name: { type: String, index: "hashed", default: "" },
    salt: { type: String, required: true },
    created_at: { type: Date, index: { unique: false }, default: Date.now },
    updated_at: { type: Date, index: { unique: false }, default: Date.now }
  });

  UserSchema.virtual("password")
    .set(function(password) {
      this._password = password;
      this.salt = this.makeSalt();
      this.hashed_password = this.encryptPassword(password);
      console.log("virtual password 호출됨 : " + this.hashed_password);
    })
    .get(function() {
      return this._password;
    });

  UserSchema.method("encryptPassword", function(plainText, isSalt) {
    if (inSalt) {
      return crypto
        .createHmac("sha1", inSalt)
        .update(plainText)
        .digest("hex");
    } else {
      return crypto
        .createHmac("sha1", this.salt)
        .update(plainText)
        .digest("hex");
    }
  });

  UserSchema.method("makeSalt");
};
