const express = require("express");
const router = express.Router();
const personControllers = require("../controllers/personControllers");

/*************************************************************************************************** */

/***************************************************************************
 * 1- Create a new person to the database
 * Method: POST
 * Route : "/api/person/create"
 * Body :
 *     - name : type : String , required
 *     - position : type : String , required
 *     - age : type : Number , required
 *     - uniqueID : type : Number , required
 **************************************************************************/

router.post("/create", async (req, res) => {
  let name = req.body.name;
  let position = req.body.position;
  let age = req.body.age;
  let uniqueID = req.body.uniqueID;

  try {
    let result = await personControllers.createPerson(
      name,
      position,
      age,
      uniqueID
    );

    res.status(200).json({
      message: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/************************************************************************************************************************** */
/***************************************************************************
 * 2- Read all people in the database
 * Method: GET
 * Route : "/api/person/read/all"

 **************************************************************************/

router.get("/read/all", async (req, res) => {
  try {
    let result = await personControllers.findAllPeople();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/****************************************************************************************************  */

/***************************************************************************
 * 3- Read all people with a certain property
 * Method: GET
 * Route : "/api/car/read/:prop/:prop_id"
 * The Prop list : 
 * name 
 * position
 * age
 * uniqueID  
 * 
 * YOU MUST TYPE THEM AS THEY ARE WRITTEN HERE 

 **************************************************************************/

router.get("/read/:prop/:prop_id", async (req, res) => {
  try {
    let result = await personControllers.checkExistance(
      req.params.prop,
      req.params.prop_id
    );

    if (result) {
      let foundpeople = await personControllers.findPeopleBy(
        req.params.prop,
        req.params.prop_id
      );
      res
        .status(200)
        .json({ message: "The person is exist", result: foundpeople });
    } else {
      res.status(200).json({ message: "The person is not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/update/:unique_id", async (req, res) => {
  try {
    let result = await personControllers.checkExistance(
      "uniqueID",
      req.params.unique_id
    );

    if (result) {
      let updatedPerson = await personControllers.updatePeopleBy(
        req.body.attribute,
        req.params.unique_id,
        req.body.updatedItem
      );


      res
        .status(200)
        .json({ message: "The person is updated", result: updatedPerson });
    } else {
      res.status(200).json({ message: "The person is not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




router.delete("/delete/:unique_id", async (req, res) => {

  let unique_id = req.params.unique_id ;

  try {
    let result = await personControllers.deletePerson(unique_id);

     res.json(result)
  
  } catch (error) {
  res.json(error)
  }
 
})



router.delete("/deleteAll/", async (req, res) => {


  try {
    let result = await personControllers.deleteAll();

     res.json(result)
  
  } catch (error) {
  res.json(error)
  }
 
})









module.exports = router;
