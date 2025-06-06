const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }; //create an empty cart. will be used if no cart exists yet

      if (!err) {
        //if theres no error, its becase the cart exists, we parse it
        cart = JSON.parse(fileContent);
      }
      //analyze it to find if existing product exists
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      //add new product and/or increase quentity
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1; //increase quantity
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        //new product
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      //update cart price
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }

      //update cart
      const updatedCart = { ...JSON.parse(fileContent) };

      //how man ytimes does this product exist in cart
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
    }
      const productQty = product.qty;

      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getProducts(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
