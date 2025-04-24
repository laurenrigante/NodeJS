const getDb = require("../util/database").getDb; //import the getDb function from database.js

class User {
  constructor(username, email, id) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this) //this refers to the current instance of the class
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: ObjectId.createFromHexString(id) })
  }
}
module.exports = User;
