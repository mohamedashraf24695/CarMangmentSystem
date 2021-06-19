const express = require("express");
const router = express.Router();
const cardControllers = require("../controllers/cardControllers");
const carControllers = require("../controllers/carControllers");

router.post("/", async (req, res) => {
  let brand = req.body.brand;
  let model = req.body.model;
  let plateNo = req.body.plateNo;
  let ownerID = req.body.ownerID;

  try {
    let result = await carControllers.createCar(brand, model, plateNo, ownerID);

    if (result === "The employee is not in the database") {
      res.status(200).json({ message: result });
      return;
    } else if (result === "The user is having another car") {
      let foundCar = await carControllers.findCarsBy("ownerID", ownerID);
      res.status(200).json({ message: result, result: foundCar });
      return;
    } else if (result === "Car is exist with other person") {
      let foundCar = await carControllers.findCarsBy("plateNo", plateNo);
      res.status(200).json({ message: result, result: foundCar });
      return;
    } else {
      let newCardResult = await cardControllers.createCard(plateNo, ownerID);
      res.status(200).json({
        message: newCardResult,
      });
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
