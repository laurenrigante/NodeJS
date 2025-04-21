const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};
module.exports = class Product {
  constructor(t, imageUrl, price, description) {
    this.title = t;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  //store product to an array of products
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    //static calls the method on the class itself and not the instantiated objs
    getProductsFromFile(callback);
  }
};
