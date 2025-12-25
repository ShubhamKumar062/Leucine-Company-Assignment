const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {type : String , required: true},
    type : { type: String, required: true, enum: ["Machine", "Vessel", "Tank", "Mixer"]},
    status : { type :String, required: true, enum: ['Active', 'Inactive', 'Under Maintenance'],default: 'Active'},
    lastCleaned : { type : Date , required : true}
})

module.exports = mongoose.model('User', userSchema); 