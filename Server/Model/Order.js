const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const orderSchema=new Schema({ 
    userId:{
        type:String,
        required:[true,"enter user id"]
    },
    items:[
        {
            productId:{
                type:String,
                required:[true,"enter product id"]
            },
            quantity:{
                type:Number,
                required:[true,"enter quantity"]
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:[true,"enter total Price"]
    },
    address:{
        type:Object,
        required:[true,"enter address"]
    },
    orderStatus:{
        type:String,
        required:[true,"enter status"],
        default:"pending"
    }
},{timestamps:true});

const orderModel=mongoose.model("orders",orderSchema);

module.exports=orderModel;