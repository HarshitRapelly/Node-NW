const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose")
// const fs = require("fs");       // import fs
// const short = require("short-uuid");

dotenv.config();

const {PORT, DB_PASSWORD, DB_USER} = process.env;

const app = express();

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.zsc0wpn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

// here our server is contacts DB in async mode
mongoose.connect(dbURL).then(function(connection){
    console.log("Connection Success");
}).catch(err=>console.log(err));

const userSchemaRules = {
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        reuired:true,
        minlength:8
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    confirmPassword:{
        type:String,
        required:true,
        minlength:8,
        validate: function(){
            return this.password==this.confirmPassword
        }
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
}

const userSchema = new mongoose.Schema(userSchemaRules);
// this modal will have queries/ syntaxes

const UserModel = mongoose.model("UserModal",userSchema);

















// const port = process.env.PORT || 3000;

// read the JSON file where we have our details of users
// const strContent = fs.readFileSync("./dev-data.json", "utf-8");
// const userDataStore = JSON.parse(strContent);

// Middleware to parse JSON
app.use(express.json());

// Middleware: validate POST body
app.use((req, res, next) => {
    if (req.method === "POST") {
        const userDetails = req.body;
        if (!userDetails || Object.keys(userDetails).length === 0) {
            return res.status(400).json({
                status: "failure",
                message: "User details are empty"
            });
        }
    }
    next();
});

// Routes
app.get("/api/user", getAllUsers);
app.post("/api/user", createUserHandler);
app.get("/api/user/:userId", getUserById);

// Function to fetch user by ID
function findUserById(id) {
    return userDataStore.find(user => user.id == id);
}

async function createUserHandler(req, res) {
    // const id = short.generate();
    // const userDetails = req.body;

    // userDetails.id = id;
    // userDataStore.push(userDetails);

    // fs.writeFileSync("./dev-data.json", JSON.stringify(userDataStore));

    // res.status(200).json({
    //     status: "success",
    //     message: "User created successfully",
    //     user: userDetails
    // });


    try{
        const userDetails = req.body;
        // adding user to the DB 
        const user = await UserModel.create(userDetails);
        res.status(200).json({
            status:"success",
            message:`added the user`,
            user,
        })
    } catch(err){
        res.status(500).json({
            status:"failure",
            message:err.message
        })
    }










}

async function getUserById(req, res) {
    try {
        const userId = req.params.userId;
        // const userDetails = findUserById(userId);
        const userDetails = await UserModel.findById(userId);

        if (!userDetails) {
            throw new Error(`User with id ${userId} not found`);
        }

        res.status(200).json({
            status: "success",
            data: userDetails
        });
    } catch (err) {
        res.status(404).json({
            status: "failure",
            message: err.message
        });
    }
}

async function getAllUsers(req, res) {
    try {
        console.log("I am inside get method");

        const userDataStore = await UserModel.find()

        if (userDataStore.length === 0) {
            throw new Error("No users found");
        }
        res.status(200).json({
            status: "success",
            data: userDataStore
        });
    } catch (err) {
        res.status(404).json({
            status: "failure",
            message: err.message
        });
    }
}


// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        status: "failure",
        message: "404 Page Not Found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at this port ${PORT}`);
});
