const express=require('express');
const path=require('path');
const bodyParser = require('body-parser');

const app= express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const errorController=require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
//serving files statically for the css
app.use(express.static(path.join(__dirname,"public")));

//register the routes here- still care about the order of appearance
app.use(adminRoutes); //will consider our admin routes when finding requests
app.use(shopRoutes);

app.use(errorController.getNotFoundPage);

app.listen(3000); 