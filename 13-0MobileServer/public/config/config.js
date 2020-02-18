module.exports = {
  server_port: 3000,
  db_url: "mongodb://localhost:27017/local",
  db_schemas: [
    {
      file: "./user_schema",
      collection: "users6",
      schemaName: "UserSchema",
      modelName: "UserModel"
    }
  ],
  route_info: [],
  facebook: {
    clientId: "id here",
    clientSecret: "secret here",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  twitter: {
    clientId: "id here",
    clientSecret: "secret here",
    callbackURL: "/auth/twitter/callback"
  },
  google: {
    clientId: "id here",
    clientSecret: "secret here",
    callbackURL: "/auth/google/callback"
  }
};
