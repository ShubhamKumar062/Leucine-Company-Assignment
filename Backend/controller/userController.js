const user = require("../models/user")

module.exports.getUser = async (req,res) =>{
    try {
        const User = await user.find()
        res.status(200).json({message:"Equipements Fetched Successfully", User})
    } catch (error) {
        res.status(500).json({message: "Unable to get Equipements", error})
    }
}

module.exports.postUser = async (req,res) =>{
    const User= new user(req.body) 
    try {
        const newUser = await User.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.updateUser = async (req,res) =>{
    try {
        const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({message : "User is updated Successfully", updatedUser});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteUser = async (req,res) =>{
    try {
       const id = req.params.id ; 
       const deleteUser = await user.findByIdAndDelete(id)
       res.status(200).json({message: "User is delted Successflly", deleteUser}) 
    } catch (error) {
        res.status(500).json({message: "Unable to delete User", error})
    }
}