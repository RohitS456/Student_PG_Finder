const mongoose=require("mongoose");
//creating Schema
const RegSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    
});
//creating model
const Reg=mongoose.model("Reg",RegSchema);
module.exports=Reg;