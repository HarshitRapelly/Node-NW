const mongoose = require("mongoose");

const newProductSchemaRules = {
    name: {
        type: String,
        required: [true, "Kindly pass the name"],
        unique: [true, "Product name should be unique"],
        maxlength: [40, "Your Product name length is more than 40 characters"]
    },
    price: {
        type: Number,
        required: [true, "Kindly pass the price"],
        validate: {
            validator: function () {
                return this.price > 0;
            },
            message: "Price can't be negative"
        }
    },
    categories: {
        type: [String],
        required: true
    },
    productImages: {
        type: [String]
    },
    averageRating: {
        type: Number,   // ✅ changed from String to Number
        min: [0, "Rating can't be less than 0"],
        max: [5, "Rating can't be more than 5"]
    },
    discount: {
        type: Number,
        validate: {
            validator: function () {
                if (this.discount == null) return true;
                return this.discount < this.price;
            },
            message: "Discount must be less than actual price"
        }
    },
    description: {
        type: String,
        required: [true, "Kindly add description"],
        maxlength: [2000, "Description can't be bigger than 2000 characters"]
    },
    stock_quantity: {
        type: Number,
        required: [true, "You should enter stock of the product (>= 0)"],
        validate: {
            validator: function () {
                return this.stock_quantity >= 0;
            },
            message: "Stock quantity can't be negative"
        }
    },
    brand: {
        type: String,
        required: [true, "Please enter the brand name"]
    }
};

const productSchema = new mongoose.Schema(newProductSchemaRules);
let validCategories = ["Electronics","Audio","Clothing","Accessories","Fashion","Sports"]

productSchema.pre("save", function(next){
    const product = this;
    const invalidCategories = product.categories.filter((category)=>{
        return !validCategories.includes(category);
    })
    if(invalidCategories.length>0){
        const err = new Error("product from these categories are not allowed to be sold");
        return next(err);
    } else{
        next();
    }

});


const ProductModel = mongoose.model("newProductModel", productSchema);

module.exports = ProductModel;
