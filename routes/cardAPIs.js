const express = require("express");
const router = express.Router();
const cardControllers = require("../controllers/cardControllers");
/******************************************************************************* */



/***************************************************************************
 * 1- Create a new card to the database
 * Method: POST
 * Route : "/api/card/create"
 * Body :
 *     - plateNo : type : Number , required
 **************************************************************************/


router.post("/create", async (req, res) => {
 
  let plateNo = req.body.plateNo;
  let ownerID = req.body.ownerID;

  try {
    let result = await cardControllers.createCard(plateNo, ownerID);
    res.status(200).json({
      message: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
/******************************************************************************* */


/***************************************************************************
 * 2- Read all cards in the database
 * Method: GET
 * Route : "/api/card/read/all"

 **************************************************************************/

router.get("/read/all", async (req, res) => {
  try {
    let result = await cardControllers.findAllCards();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
/******************************************************************************* */


/***************************************************************************
 * 3- Read all cards with a certain property
 * Method: GET
 * Route : "/api/card/read/:prop/:prop_id"
 * The Prop list : 
 * plateNo 

 * YOU MUST TYPE THEM AS THEY ARE WRITTEN HERE 

 **************************************************************************/
router.get("/read/:prop/:prop_id", async (req, res) => {
  try {
    let result = await cardControllers.checkExistance(
      req.params.prop,
      req.params.prop_id
    ); 

    if (result) {

      let foundCards = await cardControllers.findCardsBy(
        req.params.prop,
        req.params.prop_id
      )
      res.status(200).json({ message: "The Car is exist" ,
                              result : foundCards });
    } else {
      res.status(200).json({ message: "The Car is not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
/******************************************************************************* */


router.patch("/update/:plate_id", async (req, res) => {

  let plate_id = req.params.plate_id ;
  let updatedItem = req.body.updatedItem; 


  try {
    let result = await cardControllers.updateCardNo(plate_id,updatedItem);

     res.json(result)
  
  } catch (error) {
  res.json(error)
  }
 
})


router.delete("/delete/:plate_id", async (req, res) => {

  let plate_id = req.params.plate_id ;

  try {
    let result = await cardControllers.deleteCard(plate_id);

     res.json(result)
  
  } catch (error) {
  res.json(error)
  }
 
})


router.delete("/delete/:plate_id", async (req, res) => {

  let plate_id = req.params.plate_id ;

  try {
    let result = await cardControllers.deleteCard(plate_id);

     res.json(result)
  
  } catch (error) {
  res.json(error)
  }
 
})







module.exports = router;
/******************************************************************************* */
