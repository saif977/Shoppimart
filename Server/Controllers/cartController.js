const Cart=require("../Model/Cart");
const User=require("../Model/User");

exports.getCart=async (req,res,next)=>{
    try{
        const userId=req.params.userId;
        console.log(userId);
        const cart=await Cart.findOne({userId});
        if(!cart)
        res.json({cart:null,"message":"Cart is Empty"});
        res.json({cart});
    }
    catch(err)
    {
        console.log(err);
    }
}

exports.getCarts=async (req,res,next)=>{
    try{
        const carts=await Cart.find().sort({createdAt:-1});
        if(!carts)
        res.json("no carts found");
        res.json(carts);
    }
    catch(err){
        console.log(err);
    }
}

exports.postAddToCart=async (req,res,next)=>{
    try{
        console.log(req.body);
        const {userId,productId,color,size,price,quantity}=req.body;
        const user=await User.findById(userId);  // to check if the user exists
        if(!user)
        res.json("user doesnt exist");
        const cart=await Cart.findOne({userId});
        console.log(cart);
        if(cart)
        {
            let updateditems=cart.items;
            const productIndexInItems=updateditems.findIndex((product=>{
                return product.productId.toString()===productId.toString();
                 }
             ));
            if(productIndexInItems!==-1)
            {
                updateditems[productIndexInItems].quantity+=+quantity;
                updateditems[productIndexInItems].color=color;
                updateditems[productIndexInItems].size=size;
            }
            else{
                updateditems.push({
                    productId,
                    color,
                    size,
                    price,
                    quantity
                });
            }
            const updatedCart=await Cart.findByIdAndUpdate(cart._id,{$set:{items:updateditems}},{new:true});
            res.json(updatedCart);
        }
        else{
            const cart=await Cart.create({userId,items:[{productId,color,size,price,quantity}]});
            res.json(cart);
        }
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteProductFromCart=async (req,res,next)=>{
    try
    {

        const userId=req.query.userId;
        const productId=req.query.productId;
        console.log(req.query,"query");
        //console.log(JSON.parse(req.headers.data));
        let cart=await Cart.findOne({userId});
        if(!cart)
        res.json("no cart found");
        let updatedItems=[...cart.items];
        const productIndex=updatedItems.findIndex((product)=>{
            return product.productId.toString()===productId.toString();
        });
        if(productIndex===-1)
        res.json("product not found");
        console.log(productIndex,"prod index");
        updatedItems=updatedItems.filter(product=>product.productId.toString()!==productId);
        console.log(updatedItems);
        cart=await Cart.findByIdAndUpdate(cart._id,{$set:{items:updatedItems}},{new:true});
        res.json(cart);
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteCart=async (req,res,next)=>{
    try{

        const userId=req.params.userId;
        const cart=await Cart.findOne({userId});
        if(!cart)
        res.json("no cart found");
        await Cart.findByIdAndDelete(cart._id);
        res.json("succesfully deleted");
    }
    catch(err){
        console.log(err);
    }
}

//test