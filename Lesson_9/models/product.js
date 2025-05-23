const fs = require("fs");
const path = require("path");
const Cart= require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
    if (this.id) {
      //id exists, save should not create a new id
      const existingProductIndex = products.findIndex(prod => prod.id === this.id);
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex] = this;

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
      });

    } else {
      this.id = Math.random().toString(); //create new dummy id for now
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
    }
  });
  }

  static deleteById(id){
    getProductsFromFile((products) => {
      //keep only items that do not match the deleted item id
      const product=products.find(prod=> prod.id ===id); //find the product

      const updatedProductsArray = products.filter((p) => p.id !== id); //if this returns true, the element is kept
      fs.writeFile(p,JSON.stringify(updatedProductsArray), err=>{
        if(!err){
          //remove from cart
            Cart.deleteProduct(id, product.price);
        }
      })
    });

  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id); //find the product by id
      cb(product);
    });
  }
};
