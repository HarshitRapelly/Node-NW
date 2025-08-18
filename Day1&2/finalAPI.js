const express = require("express");

const app = express();

const fs = require("fs");//fs is file system provide by Node
const short = require("short-uuid")

// read the json file where we have our details of users
const strContent = fs.readFileSync("./dev-data.json","utf-8");

// json format read from dev-data.json file need to be converted to normal obj format
const userDataStore = JSON.parse(strContent);


app.get("/api/user", function(req, res) {
    // console.log("I am from get method");
    // res.status(200).json({
    //     status: "success",
    //     message: "sending response from get method"
    // });
    // let message = ""
    // if(userDataStore.length==0){
    //     message ="No User Found"
    // } else{
    //     message = userDataStore;
    // }
    // res.status(200).json({
    //     status:"success",
    //     message,//message: message
    // })
    try{
        console.log("I am inside get method");
        if(userDataStore.length==0){
            throw new Error("No User Found");
        }
        res.status(200).json({
            status:"Success",
            message:userDataStore
        })
    } catch(err){
        res.status(404).json({
            status:"Failure",
            message:err.message
        })
    }

});


app.use(express.json());// to get data from user


app.use(function (req, res, next) {
    if (req.method === "POST") {
        const userDetails = req.body;

        if (!userDetails || Object.keys(userDetails).length === 0) {
            return res.status(404).json({
                status: "failure",
                message: "user Details are empty"
            });
        } else {
            return next();
        }
    } else {
        return next();
    }
});

app.post("/api/user", createUserHandler );

// to get uer based on id -> template route where we are taking params and retrieving data
app.get("/api/user/:userId", getUserById);

function getUserByid(id){
    const user = userDataStore.find((user)=>{
        return user.id == id;
    })

    if(user== undefined){
        return "no user found"
    } else{
        return user
    }
}

function createUserHandler (req, res) {
    const id = short.generate(); // generate new id when this cd fn called
    const userDetails = req.body;

    userDetails.id = id;
    userDataStore.push(userDetails) // the userDetails will be stored in local storage
    // add the user to the file

    const strUserStore = JSON.stringify(userDataStore);
    fs.writeFileSync("./dev-data.json",strUserStore)
    
    res.status(200).json({
        status:"success",
        message:"got response from post"
    })
   
}




function getUserById(req,res){
    try{
        const userId= req.params.userId;
        const userDetails = getUserByid(userId);
        if(userDetails == "no user found"){
            throw new Error(`user with ${userId} not found`)
        } else{
            res.status(200).json({
                status:"success",
                message:userDetails
            })
        }
    } catch(err) {
        res.status(404).json({
            status: "failure",
            message: err.message
        });
    }
}



app.use(function(req,res){
    res.status(200).json({
        status:"failure",
        message:"404 Page Not Found"
    })
})

const port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log(`Server is running on port ${port}`);
})