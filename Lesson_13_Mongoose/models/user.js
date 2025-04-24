const getDb = require("../util/database").getDb; //import the getDb function from database.js
const { ObjectId } = require("mongodb");
class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; //{items: [] }   //this is the cart object that will be created in the db
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this); //this refers to the current instance of the class
  }

  addToCart(product) {
    //check if a certain item already exists
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString(); //compare the ids of the products
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items]; //copy the items in the cart

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity; //increment the quantity of the product in the cart
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      }); //add the product to the cart
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(id) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteById(id) {
    const db = getDb();
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== id.toString(); //compare the ids of the products
    });
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    //add order to the user
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.username,
            email: this.email,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({'user._id':  new ObjectId(this._id) }) //find the orders of the user
      .toArray()
      .then((orders) => {
        return orders;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = User;
