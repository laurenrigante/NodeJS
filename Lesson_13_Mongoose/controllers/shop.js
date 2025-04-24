const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find() //gives us the list of all products
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; //get the dynamic product id
  Product.findById(prodId) //findbyid is a static method from mongoose
    .then((product) => {
      res.render("shop/product-detail", {
        product: product, //pass produt to be able to get its propeerties in the view
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId") //populate the cart with the productId
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products, //sent to view
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("Received product ID:", prodId);
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteFromCart(prodId) //delete the item from the cart
    .then((product) => {
      res.redirect("/cart");
      console.log("Deleted product from cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  req.user.populate("cart.items.productId").then((user) => {
    const products = user.cart.items.map((i) => {
      return { quantity: i.quantity, product: { ...i.productId._doc } }; //get the productId and quantity of the products in the cart
    });

    const order = new Order({
      products: products,
      user: {
        name: req.user.name,
        userId: req.user,
      },
    });
    return order
    .save()
    .then((result) => {
      req.user.clearCart(); //clear the cart after the order is created
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
  }); //populate the cart with the productId
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id }) //find the orders of the user
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
