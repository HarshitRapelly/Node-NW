const getAllFactory = function (ElementModel){
    return async function (req, res) {
    try {
        console.log("I am inside get method");

        const elementDetails = await ElementModel.find()

        if (elementDetails.length === 0) {
            throw new Error("No users found");
        }
        res.status(200).json({
            status: "success",
            message: elementDetails
        });
    } catch (err) {
        res.status(404).json({
            status: "failure",
            message: err.message
        });
    }
}

}

const createFactory = function(ElementModel){
    return async function (req, res) {

    try{
        const elementDetails = req.body;
        // adding user to the DB 
        const element = await ElementModel.create(elementDetails);
        res.status(200).json({
            status:"success",
            message:`added the element`,
            element,
        })
    } catch(err){
        res.status(500).json({
            status:"failure",
            message:err.message
        })
    }


}
}


const getByIdFactory= (ElementModel)=>{
    return async function (req, res) {
    try {
        const elementId = req.params.userId;
        // const userDetails = findUserById(userId);
        const elementDetails = await ElementModel.findById(elementId);

        if (!elementDetails) {
            throw new Error(`User with id ${elementId} not found`);
        }

        res.status(200).json({
            status: "success",
            data: elementDetails
        });
    } catch (err) {
        res.status(404).json({
            status: "failure",
            message: err.message
        });
    }
}
}


const deleteByIdFactory = (ElementModel)=>{
    return async function(req,res){
    let {elementId} = req.params;
    try {
        // const userDetails = findUserById(userId);
        let element = await ElementModel.findByIdAndDelete(elementId);

        
            res.status(200).json({
            status: "successfull Deletion",
            message:element
        });
        

        
    } catch (err) {
        res.status(404).json({
            status: "failure",
            message: `user with id:${elementId} not found to delete`
        });
    }

}

}

module.exports = {getAllFactory,createFactory,getByIdFactory,deleteByIdFactory};
