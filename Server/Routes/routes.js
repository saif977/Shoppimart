const router=require("express").Router();
const mongoose=require("mongoose");
const User=require("../Model/User");

const userController=require("../Controllers/userController");
const productController=require("../Controllers/productController");
const cartController=require("../Controllers/cartController");
const orderController=require("../Controllers/orderController");
const auth=require("../Middlewares/auth");

if(process.env.NODE_ENV!=="production")
{
    const dotenv=require("dotenv").config();
}
const stripe=require("stripe")(process.env.STRIPE_SERETE_KEY);

//------------- User routes -------------
router.get("/get-user/:id",auth.authorizeAdmin,userController.getUser);
router.get("/get-users",auth.authorizeAdmin,userController.getUsers);
// router.get("/",auth.authorizeUser,(req,res,next)=>{
//     res.json({"status":"loggedIn"});
// })
router.post("/signup",userController.postSignUp);
router.post("/login",userController.postLogin);
router.post("/get-otp",userController.postGetOtp)
router.put("/reset-password",userController.putResetPassword)

//------------- Product routes --------------
router.get("/get-product/:id",productController.getProduct);
router.get("/get-products",productController.getProducts);
router.post("/add-product",auth.authorizeAdmin,productController.postAddProduct);
router.put("/update-product",auth.authorizeAdmin,productController.putUpdateProduct);
router.delete("/delete-product/:id",auth.authorizeAdmin,productController.deleteProduct);




//------------- Cart routes ----------------
router.get("/get-cart/:userId",auth.authorizeUser,cartController.getCart);
router.get("/get-carts",auth.authorizeAdmin,cartController.getCarts);
router.post("/add-to-cart/",auth.authorizeUser,cartController.postAddToCart);
router.delete("/delete-product-cart",auth.authorizeUser,cartController.deleteProductFromCart);
router.delete("/delete-cart/:userId",auth.authorizeAdmin,cartController.deleteCart);




//-------------Order routes--------------
router.get("/get-orders/:userId",auth.authorizeUser,orderController.getOrders);
router.get("/get-all-orders",auth.authorizeAdmin,orderController.getAllOrders);
router.post("/add-order",auth.authorizeUser,orderController.postAddOrder);
router.put("/cancel-order",auth.authorizeUser,orderController.putCancelOrder);



//-------------Payment routes--------------
router.post("/payment",async (req,res,next)=>{
    try{
        console.log("exec")
        const charge=await stripe.charges.create({
            amount:req.body.amount,
            currency:"usd",
            source:req.body.token,
            description:"dummy payement charge system"
        });
        res.json(charge);
    }
    catch(err){
        console.log(err.message,"new");
    }
});



module.exports=router;