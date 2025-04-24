const { ObjectId } = require("mongodb");
const getDb = require("../util/database").getDb;
class Product {
  constructor(title, price, imageUrl,  description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = ObjectId.createFromHexString(id);
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      //if this id exists, we update the product
      dbOp = db.collection("products").updateOne(
        { _id:this._id }, //find the product
        { $set: this } //update the product
      );
    } else {
      //if this id doesnt exist, we create a new product
      dbOp = db.collection("products").insertOne(this); //this refers to the current instance of the class
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: ObjectId.createFromHexString(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
