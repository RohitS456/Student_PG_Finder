const mongoose=require("mongoose");
//creating Schema
const pgSchema=new mongoose.Schema({
    city:{
        type:String,
        required:true,
    },
    location:{
         type:String,
         required:true,
    },
    budget: {
        type: Number,
        required: true,
        min: 2000,
    },
    occupancy:{
        type:String,
        required:true,
    },
    available:{
        type:String,
        required:true,
    },
    ac:{
        type:Boolean,
        required:true,
    },
    owner:{
        type:Number,
        requird:true,
    },
    wifi:{
        type:Boolean,
        required:true,
    },
    img1:{
        type:String,
        default:"https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
        set:(v)=> v===" "? "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg":v,
    },
    img2:{
        type:String,
        default:"https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
        set:(v)=> v===" "? "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg":v,
    },
    img3:{
        type:String,
        default:"https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
        set:(v)=> v===" "? "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg":v,
    },
});
//creating model
const pgmodel=mongoose.model("pgmodel",pgSchema);
module.exports=pgmodel;