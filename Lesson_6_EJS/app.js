const express=require('express');
const path=require('path');
const bodyParser = require('body-parser');

const app= express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData=require('./routes/admin');
const shopRoutes=require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));
//serving files statically for the css
app.use(express.static(path.join(__dirname,"public")));

//register the routes here- still care about the order of appearance
app.use(adminData.routes); //will consider our admin routes when finding requests
app.use(shopRoutes);

app.use((req,res,next)=>{
    res.status(404).render('not-found', {pageTitle:"Not Found"});
});

app.listen(3000); 