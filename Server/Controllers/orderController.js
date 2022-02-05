const Order=require("../Model/Order");
const User=require("../Model/User");

exports.getOrders=async (req,res,next)=>{
    try{
        const userId=req.params.userId;
        const orders=await Order.findOne({userId});
        if(!orders)
        res.json("No orders found");
        res.json(orders);
    }
    catch(err)
    {
        console.log(err);
    }
}

exports.getAllOrders=async (req,res,next)=>{
    try{
        const orders=await Order.find().sort({createdAt:-1});
        if(!orders)
        res.json("No orders found");
        res.json(orders);
    }
    catch(err){
        console.log(err);
    }
}

exports.postAddOrder=async (req,res,next)=>{
    try{
        const data=req.body;
        const user=await User.findById(data.userId);
        if(!user)
        res.json("user not found");
        const order=await Order.create(data);
        res.json(order);
    }
    catch(err){
        console.log(err);
    }
}

exports.putCancelOrder=async(req,res,next)=>{
    try{
        const {userId,orderId}=req.body;
        const user=await User.findById(userId);
        if(!user)
        res.json("user not found");
        let order=await Order.findById(orderId);
        if(!order)
        res.json("no order found");
        order.orderStatus="Cancelled";
        order=await Order.findByIdAndUpdate(orderId,{$set:order},{new:true});
        res.json(order);
    }
    catch(err){
        console.log(err);
    }
}