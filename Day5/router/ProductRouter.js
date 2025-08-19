const express = require('express');

const ProductRouter = express.Router();
const {
    createProductHandler,
    getProductById,
    deleteProductById
} = require("../controller/ProductController");
const ProductModel = require('../model/ProductModel');

const checkInput = function(req, res, next){
    if (req.method === "POST") {
        const userDetails = req.body;
        if (!userDetails || Object.keys(userDetails).length === 0) {
            return res.status(404).json({
                status: "failure",
                message: "User details are empty"
            });
        }
    }
    next();
}


const getAllProductHandler = async function (req,res){
    try{
        // are done on the level of DB 
        // -> find all the data
        // -> sort
        // -> select the data
        let query = req.query;
        let selectQuery = query.select;
        let sortQuery = query.sort;

        let queryResProm = ProductModel.find();
        if(sortQuery){
            let order = sortQuery.split(" ")[1];
            let sortParam = sortQuery.split(" ")[0];

            if(order= "inc"){
                queryResProm = queryResProm.sort(sortParam);
            } else{
                queryResProm = queryResProm.sort(-sortParam)
            }
        }


        if(selectQuery){
            queryResProm = queryResProm.select(selectQuery);
        }

        const result = await queryResProm;




        res.status(200).json({
        message:result,
        status:"success",
    })
    } catch(err){
        res.status(500).json({
            message:err.message,
            status:"failure"
        })
    }
    
    //sorting -> increasing
    // selecting -> (name,price)
}


ProductRouter.post("/",createProductHandler);
ProductRouter.get("/",getAllProductHandler);
ProductRouter.get("/:productId",getProductById);
ProductRouter.delete("/:productId",deleteProductById);

module.exports = ProductRouter