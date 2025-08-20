const express = require('express');

const ProductRouter = express.Router();
const {
    createProductHandler,
    getAllProductHandler,
    getProductById,
    deleteProductById
} = require("../controller/ProductController");

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


ProductRouter.post("/",createProductHandler);
ProductRouter.get("/",getAllProductHandler);
ProductRouter.get("/:productId",getProductById);
ProductRouter.delete("/:productId",deleteProductById);

module.exports = ProductRouter