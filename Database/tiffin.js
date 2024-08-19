const mongoose= require("mongoose");

const tiffinSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city:
    {
     type:String,
     required:true,
    },
    location:{
        type:String,
        required:true,
    },
    variety:{
        type:String,
        required:true,
    },
    meal:{
        type:String,
        required:true,
    },
    delivery:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
    },
    img:{
        type:String,
        required:true,
    }

});

const tiffin=mongoose.model("tiffin",tiffinSchema);
module.exports=tiffin;