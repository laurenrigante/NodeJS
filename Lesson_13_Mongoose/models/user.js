const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product", //refrence to product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
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
      productId: product._id,
      quantity: newQuantity,
    }); //add the product to the cart
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart; //update the cart in the user object
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
