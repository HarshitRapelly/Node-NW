const {createFactory, getAllFactory, getByIdFactory, deleteByIdFactory} = 
require("../utility/crudFactory")

const UserModel = require("../model/UserModel");



const createUserHandler = createFactory(UserModel);
const getUserById = getByIdFactory(UserModel);
const getAllUsers = getAllFactory(UserModel)
const deleteUserById = deleteByIdFactory(UserModel);

module.exports = {
    createUserHandler,
    getUserById, 
    getAllUsers,
    deleteUserById
}
