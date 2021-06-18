

 const mongoose = require("mongoose");

 const carSchema = new mongoose.Schema({
   brand: {
     type: String,
     required: true,
   },
   model: {
     type: String , 
     required: true,

   },
   plateNo: {
     type:Number,
     required: true,
   } ,
   ownerID : {
    type:Number,
    required: true,
   }
   
 });
 
 module.exports = mongoose.model("car", carSchema);
 