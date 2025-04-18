const fs= require('fs');
const path = require('path');

module.exports= class Product {
    constructor (t){
        this.title=t;
    }

    //store product to an array of products
    save(){
      const p=path.join(
        path.dirname(process.mainModule.filename),
        'data', 'products.json'
    );
    fs.readFile(p, (err,fileContent)=>{
     let products=[];
        if(!err){
            products=JSON.parse(fileContent);
        }
        products.push(this);
        fs.writeFile(p,JSON.stringify(products), (err)=>{
            console.log(err);
        });
    });

   }

    static fetchAll(){ //static calls the method on the class itself and not the instantiated objs
           fs.readFile(p, (err, fileContent)=>{
            if(err){
                return [];
            }
            return JSON.parse(fileContent);
           })
        return products;
    }
}