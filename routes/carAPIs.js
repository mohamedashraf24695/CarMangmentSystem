const express = require("express");
const router = express.Router();
const carControllers = require("../controllers/carControllers");
/******************************************************************************* */

/***************************************************************************
 * 1- Create a new car to the database
 * Method: POST
 * Route : "/api/car/create"
 * Body :
 *     - brand : type : String , required
 *     - model : type : String , required
 *     - plateNo : type : Number , required
 *     - ownerID : type : Number , required
 **************************************************************************/

router.post("/create", async (req, res) => {
  let brand = req.body.brand;
  let model = req.body.model;
  let plateNo = req.body.plateNo;
  let ownerID = req.body.ownerID;

  try {
    let result = await carControllers.createCar(brand, model, plateNo, ownerID);
    await console.log(result);
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
 * 2- Read all cars in the database
 * Method: GET
 * Route : "/api/car/read/all"

 **************************************************************************/

router.get("/read/all", async (req, res) => {
  try {
    let result = await carControllers.findAllCars();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
/******************************************************************************* */

/***************************************************************************
 * 3- Read all cars with a certain property
 * Method: GET
 * Route : "/api/car/read/:prop/:prop_id"
 * The Prop list : 
 * plateNo 
 * brand
 * model
 * ownerID  
 * 
 * YOU MUST TYPE THEM AS THEY ARE WRITTEN HERE 

 **************************************************************************/
router.get("/read/:prop/:prop_id", async (req, res) => {
  try {
    let result = await carControllers.checkExistance(
      req.params.prop,
      req.params.prop_id
    );

    if (result) {
      let foundCars = await carControllers.findCarsBy(
        req.params.prop,
        req.params.prop_id
      );
      res.status(200).json({ message: "The Car is exist", result: foundCars });
    } else {
      res.status(200).json({ message: "The Car is not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/update/:plate_id", async (req, res) => {
  let plate_id = req.params.plate_id;
  let attribute = req.body.attribute;
  let updatedItem = req.body.updatedItem;

  try {
    let result = await carControllers.updateCarBy(
      attribute,
      plate_id,
      updatedItem
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});



router.delete("/delete/:plate_id", async (req, res) => {

  let plate_id = req.params.plate_id ;

  try {
    let result = await carControllers.deleteCar(plate_id);

    console.log(result);
     res.json(result)
  
  } catch (error) {
    console.log(error);
  res.json(error)
  }
 
})




/******************************************************************************* */

module.exports = router;
/******************************************************************************* */
