const {createFactory, getAllFactory, getByIdFactory, deleteByIdFactory} = 
require("../../Day4/utility/crudFactory")

const ProductModel = require("../../Day4/model/ProductModel");


const createProductHandler = createFactory(ProductModel);
const getAllProductHandler = getAllFactory(ProductModel);
const getProductById = getByIdFactory(ProductModel);
const deleteProductById = deleteByIdFactory(ProductModel);

module.exports = {
    createProductHandler,
    getAllProductHandler,
    getProductById,
    deleteProductById
}
