const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const orderSchema=new Schema({
    products:[
        {
            product:{
                type:Schema.Types.ObjectId,
                required:true,
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    
    user:{
        name:{
            type:String,
            required:true
        },
        userId:{
            type:Schema.Types.ObjectId,
            ref:'User', //associations in mongoose, here we are referencing the user model we created
            required:true
        }
    }
})

module.exports=mongoose.model('Order',orderSchema); //mongoose connects a schema to the model