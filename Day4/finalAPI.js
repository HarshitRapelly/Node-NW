const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose")
// const fs = require("fs");       // import fs
// const short = require("short-uuid");

dotenv.config();

const {PORT, DB_PASSWORD, DB_USER} = process.env;

const app = express();
const UserModel = require("./UserModel");
const ProductModel = require("./ProductModel")

const {getAllFactory,createFactory,getByIdFactory,deleteByIdFactory} = require("./utility/crudFactory");



const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.zsc0wpn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

// here our server is contacts DB in async mode
mongoose.connect(dbURL).then(function(connection){
    console.log("Connection Success");
}).catch(err=>console.log(err));



















// const port = process.env.PORT || 3000;

// read the JSON file where we have our details of users
// const strContent = fs.readFileSync("./dev-data.json", "utf-8");
// const userDataStore = JSON.parse(strContent);

// Middleware to parse JSON
app.use(express.json()); // to get data from user, is example for userDefinedMiddleware



// Middleware: validate POST body

// Routes


// Function to fetch user by ID
function findUserById(id) {
    return userDataStore.find(user => user.id == id);
}


// Handler Functions for Users
const createUserHandler = createFactory(UserModel);
const getUserById = getByIdFactory(UserModel);
const getAllUsers = getAllFactory(UserModel)
const deleteUserById = deleteByIdFactory(UserModel);
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

// Products
const createProductHandler = createFactory(ProductModel);
const getAllProductHandler = getAllFactory(ProductModel);
const getProductById = getByIdFactory(ProductModel);
const deleteProductById = deleteByIdFactory(ProductModel);






// users API'S
//routes
app.get("/api/user", getAllUsers);
//we are chaining the controller functions
app.post("/api/user",checkInput, createUserHandler);
app.get("/api/user/:userId", getUserById);
app.delete("/api/user/:userId",deleteUserById);

//products API'S
app.post("/api/product",createProductHandler);
app.get("/api/product",getAllProductHandler);
app.get("/api/product/:productId",getProductById);
app.delete("/api/product/:productId",deleteProductById);



// closure in JS





// 404 Handler
app.use(function(req, res){
    res.status(404).json({
        status: "failure",
        message: "404 Page Not Found"
    });
});

//app.use(checkInput);


app.listen(PORT, () => {
    console.log(`Server is running at this port ${PORT}`);
});

//At Code level -> prevent repetition -> Factory Design
// At file level -> structure to segregate the code -> MVC (Motor view controller)
