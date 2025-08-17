// import express 
const express = require('express');
// syntax -> used to create express framework

const app = express();
//this line is reason server is working
// app.use is a method give by express used for communication purposes.
// we can pass a handler/ call back fn -> it accepts 2 things:
// 1. req: obj representing request
// 2. res: obj representing response
//this method irrespective of the call done by either get/post/etch this will respond

// app.use(function(req,res,next){
//     console.log("before",req.body);
//     next();
// })


//to get the details of items from request
//it is inbuild middleware -> to add data coming in body of HTTP request to req.body
app.use(express.json());


// app.use(function(req,res,next){
//     console.log("after",req.body);
//     console.log("Hi I will be called everytime")
//    next();
// })


app.post("/api/user",function(req,res){
    console.log("I am inside post method", req.body)
    res.status(200).json({
        status:"success",
        message:"sending response from post method",
    })
})



app.get("/api/user",function(req,res){
    console.log("I am inside get method")
    res.status(200).json({
        status:"success",
        message:"sending response from get method",
    })
})


//process.env.PORT => this searches for .env file in the code server itself.
//.env files are used in the projects to just store important details like PORT, api keys.

const port = process.env.PORT || 3000;

//server - > run on a port
app.listen(port,function(){
    console.log(`Server is listening at port ${port}`)
});
// listen is method which tells us given port is active

