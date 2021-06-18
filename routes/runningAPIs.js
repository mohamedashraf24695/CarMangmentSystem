const express = require("express");
const router = express.Router();
const cardControllers = require("../controllers/cardControllers");

router.post("/sim", async (req, res) => {
  let plateNumber = req.body.plateNo;

  let timeDifference = await cardControllers.timeSinceLastTime(plateNumber);

  await cardControllers.assignNewTime(plateNumber);

  let result = await cardControllers.chargeTaker(plateNumber, timeDifference);

  res.json({ result });
});



module.exports = router;
