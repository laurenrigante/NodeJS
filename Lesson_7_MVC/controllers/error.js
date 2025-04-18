exports.getNotFoundPage= (req,res,next)=>{
    res.status(404).render('not-found', {pageTitle:"Not Found"});
}