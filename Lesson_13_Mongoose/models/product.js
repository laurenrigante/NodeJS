const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    } ,
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User', //associations in mongoose, here we are referencing the user model we created
        required:true
    } 
});

module.exports=mongoose.model('Product',productSchema); //mongoose connects a schema to the model


