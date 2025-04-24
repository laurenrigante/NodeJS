const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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
  Product.findById(prodId)
    .then(
      (product) => {
        res.render("shop/product-detail", {
          product: product, //pass produt to be able to get its propeerties in the view
          pageTitle: product.title,
          path: "/products",
        });
      }
    )
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
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
  req.user.getCart().then((cart) => {
    return cart
      .getProducts()
      .then((products) => {
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: products, //sent to view
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } }); //retrieve single product
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0]; //get the first product
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity; //get the old quantity
        newQuantity = oldQuantity + 1; //increment the quantity
        return product; //return the product
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      }); //return the product
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      //at this point we have the product
      const product = products[0];
      return product.cartItem.destroy(); //delete the cart item
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      console.log(products);
      return req.user
        .createOrder()
        .then((order) => {
          order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity }; //set the quantity
              return product; //return the product
            })
          );
          return order.save(); //save the order
        })
        .catch((err) => {
          console.log(err);
        })
        .then((result) => {
          return fetchedCart.setProducts(null); //remove all products from the cart
        })
        .then((result) => {
          res.redirect("/orders");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['products']}) //eager loading. 
    //fetching all orders and related products, give me back an array of order including products
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders:orders
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
