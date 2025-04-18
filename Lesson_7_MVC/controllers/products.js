
const products=[];

exports.getAddProduct=(req,res,next)=>{
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path:'/add-product',
        formsCSS:true,
        productCSS:true,
        activeAddProduct:true
    });
 };

 exports.PostAddProduct= (req,res,next)=>{
      products.push({title: req.body.title});
      res.redirect('/');
  
  };

  exports.getProducts= (req,res,next)=>{
    res.render('shop', {prods:products, path:'/', pageTitle:'Shop'});
  }