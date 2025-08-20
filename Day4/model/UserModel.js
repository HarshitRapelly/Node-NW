
const mongoose = require("mongoose")

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

module.exports = UserModel;