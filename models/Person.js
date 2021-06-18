

 const mongoose = require("mongoose");

 const personSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true,
   },
   position: {
     type: String , 
     required: true,

   },
   age: {
     type:Number,
     required: true,
   } ,

   uniqueID: {
    type:Number,
    required: true,
   }
 });
 
 module.exports = mongoose.model("person", personSchema);
 