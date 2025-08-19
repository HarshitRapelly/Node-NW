const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose")
// const fs = require("fs");       // import fs
// const short = require("short-uuid");

dotenv.config();

const {PORT, DB_PASSWORD, DB_USER} = process.env;

const app = express();
const UserRouter = require("./router/UserRouter");
const ProductRouter = require("./router/ProductRouter");







const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.zsc0wpn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

// here our server is contacts DB in async mode
mongoose.connect(dbURL).then(function(connection){
    console.log("Connection Success");
}).catch(err=>console.log(err));


// Middleware to parse JSON
app.use(express.json()); // to get data from user, is example for userDefinedMiddleware



// Middleware: validate POST body

// Routes


// Function to fetch user by ID
function findUserById(id) {
    return userDataStore.find(user => user.id == id);
}



app.use("/api/user",UserRouter);
app.use("/api/product",ProductRouter);

// app.get("/search",function(req,res){
//     console.log(req.query);
//     res.status(200).json({
//         message:req.query,
//         status:"success",
//     })
// })


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

// Handler Functions for Users
// const createUserHandler = createFactory(UserModel);
// const getUserById = getByIdFactory(UserModel);
// const getAllUsers = getAllFactory(UserModel)
// const deleteUserById = deleteByIdFactory(UserModel);


// Products
// const createProductHandler = createFactory(ProductModel);
// const getAllProductHandler = getAllFactory(ProductModel);
// const getProductById = getByIdFactory(ProductModel);
// const deleteProductById = deleteByIdFactory(ProductModel);

// users API'S
//routes
// UserRouter.get("/", getAllUsers);
// UserRouter.post("/",checkInput, createUserHandler);
// UserRouter.get("/:userId", getUserById);
// UserRouter.delete("/:userId",deleteUserById);

//products API'S
// ProductRouter.post("/",createProductHandler);
// ProductRouter.get("/",getAllProductHandler);
// ProductRouter.get("/:productId",getProductById);
// ProductRouter.delete("/:productId",deleteProductById);

app.use(function(req, res){
    res.status(404).json({
        status: "failure",
        message: "404 Page Not Found"
    });
});





 


app.listen(PORT, () => {
    console.log(`Server is running at this port ${PORT}`);
});

//At Code level -> prevent repetition -> Factory Design
// At file level -> structure to segregate the code -> MVC (Model view controller)
// 