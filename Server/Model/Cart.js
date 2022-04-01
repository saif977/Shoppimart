const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const cartSchema=new Schema({ 
    userId:{
        type:String,
        unique:true,
        required:[true,"enter user id"]
    },
    items:[
        {
            productId:{
                type:String,
                required:[true,"enter product id"]
            },
            color:{
                type:String,
                required:[true,"enter color"]
            },
            size:{
                type:String,
                required:[true,"enter color"]
            },
            price:{
                type:Number,
                required:[true,"enter price"]
            },
            quantity:{
                type:Number,
                required:[true,"enter quantity"]
            }
        }
    ]
},{timestamps:true});

const cartModel=mongoose.model("carts",cartSchema);

module.exports=cartModel;