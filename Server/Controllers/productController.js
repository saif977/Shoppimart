const Product=require("../Model/Product");

exports.postAddProduct=async (req,res,next)=>{
    try{
        const {imgURL,title,desc,price,categories,size,color}=req.body;
        const product=await Product.create({imgURL,title,desc,price,categories,size,color});
        res.json(product);
    }
    catch(err){
        console.log(err);
    }
}

exports.getProducts=async (req,res,next)=>{
    try{
       // const queryNew=req.query.new;
        const queryCategories=req.query.categories;
        console.log(queryCategories);
        let products=null;
        // if(queryNew)
        // {
        //     products=await Product.find().sort({createdAt:-1});
        // }
        if(queryCategories)
        {
            products=await Product.find({categories:{$in:[queryCategories]}}).sort({createdAt:-1});
        }
        else products=await Product.find().sort({createdAt:-1});
        console.log(products);
        res.json(products);
    }
    catch(err){
        console.log(err);
    }
}

exports.getProduct=async (req,res,next)=>{
    try{
        const productId=req.params.id;
        console.log(productId);
        let product=null;
        product=await Product.findById(productId);
        res.json(product);
    }
    catch(err){
        console.log(err);
    }
}

exports.putUpdateProduct=async (req,res,next)=>{
    try{
        const data=req.body;
        const updatedProduct=await Product.findByIdAndUpdate(data._id,{$set:data},{new:true});
        res.json(updatedProduct);
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteProduct=async (req,res,next)=>{
    try{
        const id=req.params.id;
        const result=await Product.findByIdAndDelete(id);
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}