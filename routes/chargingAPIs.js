const express = require("express");
const router = express.Router();
const cardControllers = require("../controllers/cardControllers");

router.post("/:plate_no", async (req, res) => {
  let plateNumber = req.params.plate_no;
  let chargeAmount = req.body.chargeAmount;

  try {
    let result = await cardControllers.chargeCredit(plateNumber, chargeAmount);
    console.log(result);

    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
