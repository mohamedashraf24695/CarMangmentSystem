

 const mongoose = require("mongoose");

 const cardSchema = new mongoose.Schema({
   availableCredit: {
     type: Number,
     default: 10,
   },
   createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUsing: {
    type: Date ,
    default: Date.now,

  }
  ,
  
  plateNo: {
    type:Number,
    required: true,
  } 

 });
 
 module.exports = mongoose.model("card", cardSchema);
 