const express = require('express');
const UserRouter = express.Router();
const {
    createUserHandler,
    getUserById, 
    getAllUsers,
    deleteUserById
} = require("../controller/UserController");

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

UserRouter.get("/", getAllUsers);
UserRouter.post("/",checkInput, createUserHandler);
UserRouter.get("/:userId", getUserById);
UserRouter.delete("/:userId",deleteUserById);
module.exports = UserRouter
 