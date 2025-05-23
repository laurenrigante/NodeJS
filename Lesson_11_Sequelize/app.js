const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-items");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//this code will only run for incoming requests after the server is successfully initialized
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next(); //continue with next step if we get and store user
    })
    .catch((err) => {
      console.log(err);
    }); //find user in db
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); //user creating  a product
User.hasMany(Product); //user can create many products


Cart.belongsTo(User); //cart belongs to user, will add a userid key to cart
User.hasOne(Cart); //user can have one cart

Cart.belongsToMany(Product, { through: CartItem }); //cart can have many products
Product.belongsToMany(Cart, { through: CartItem }); //product can belong to many carts
//cart can have many products and product can belong to many carts
//cartitem is the junction table, we set this using through key

Order.belongsTo(User); //order belongs to user
User.hasMany(Order); //user can have many orders
Order.belongsToMany(Product, { through: OrderItem }); //order can have many products
Product.belongsToMany(Order, { through: OrderItem }); //product can belong to many orders

sequelize
  .sync()
  .then((result) => {
    //creating temp user since we dont have login or authentication
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
        return  User.create({ name: "max", email: "max@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart(); //create a cart for the user
  }).then( cart=>{
    console.log(cart);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
