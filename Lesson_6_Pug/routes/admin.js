const express= require('express');
const path=require('path');

const router=express.Router();
const rootDir=require('../util/path');

const products=[];

//middlewares
router.get('/add-product',(req,res,next)=>{
   res.render('add-product', {pageTitle: 'Add Product', path:'/add-product'});
});

router.post('/add-product', (req,res,next)=>{
    products.push({title: req.body.title});
    res.redirect('/');

});


exports.routes=router;
exports.products=products;