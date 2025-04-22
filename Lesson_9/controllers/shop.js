const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; //get the dynamic product id
  Product.findById(prodId, (product) => {
    //call the method in our model to get the product given an id
    res.render("shop/product-detail", {
      product: product, //pass produt to be able to get its propeerties in the view
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getProducts(cart=>{
    Product.fetchAll(products =>{
      const cartProducts=[];

      for(product of products){
        const cartProductData=cart.products.find(prod => prod.id===product.id)
        if(cartProductData){
          cartProducts.push({productData:product, qty:cartProductData.qty});
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts //sent to view
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDelete=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findById(prodId, product=>{
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
