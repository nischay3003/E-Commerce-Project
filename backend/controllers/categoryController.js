const Category=require("../models/categoryModel");
async function getCategories(req,res){
    try{
        const categories=await Category.findAll();
        return res.status(200).json(categories);
    }catch(err){
        return res.status(500).json("Failed to fetch Categories");
    }
}
module.exports={getCategories};