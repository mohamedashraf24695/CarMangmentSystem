const express = require("express");
const router = express.Router();
const cardControllers = require("../controllers/cardControllers");

router.post("/", async (req, res) => {
  let plateNumber = req.body.plateNo;

  try {

    let plate_existance = await cardControllers.checkExistance("plateNo",plateNumber) ; 


    if (plate_existance){

      let timeDifference = await cardControllers.timeSinceLastTime(plateNumber);

      await cardControllers.assignNewTime(plateNumber);
    
      let result = await cardControllers.chargeTaker(plateNumber, timeDifference);
    
      res.json({ result });
    }else {
      res.json({  message: "The plate doesn't exist" });

    }

 

  } catch (error) {
      res.json({ error });

  }

  
});



module.exports = router;
