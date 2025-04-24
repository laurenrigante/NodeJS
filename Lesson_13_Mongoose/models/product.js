const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }/* ,
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    } */
});

module.exports=mongoose.model('Product',productSchema); //mongoose connects a schema to the model



/* const { ObjectId } = require("mongodb");
class Product {
  constructor(title, price, imageUrl,  description, id, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id? new ObjectId(id) :null;
    this.userId = userId; //this is the id of the user who created the product
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
      .find({ _id: new ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(prodId) })
      .then((result) => {
        console.log("Deleted");
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
 */