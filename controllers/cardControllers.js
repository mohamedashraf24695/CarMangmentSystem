const Card = require("../models/Card");

async function checkCard(plateNo) {
  try {
    let check_existance_plate = await Card.exists({
      plateNo: plateNo,
    });

    if (check_existance_plate) {
      return -1;
    } else {
      return true;
    }
  } catch (error) {
    return error.message;
  }
}

async function createCard(plateNo) {
  let result = await checkCard(plateNo);
  let newCard = await {
    plateNo: plateNo,
  };

  if (result === -1) {
    return "Card is exist";
  } else if (result === true) {
    await Card.create(newCard);
    return "The Card is created";
  } else {
    return -400;
  }
}

async function findAllCards() {
  let result = await Card.find();
  return result;
}

async function checkExistance(attribute, value) {
  let check_existance = false;

  if (attribute === "plateNo") {
    check_existance = await Card.exists({
      plateNo: value,
    });
  }

  return check_existance;
}

async function findCardsBy(attribute, value) {
  let result;

  if (attribute == "plateNo") {
    result = await Car.find({
      plateNo: value,
    });
  }

  return result;
}

async function timeSinceLastTime(plateNumber) {
  let foundCard = await Card.find({
    plateNo: plateNumber,
  });

  let time = Date.now();

  let date = new Date(time);

  let timeInMin = (date - foundCard[0].lastUsing) / 60000;

  return timeInMin;
}

async function assignNewTime(plateNumber) {
  let foundCard = await Card.find({
    plateNo: plateNumber,
  });

  let time = Date.now();

  let date = new Date(time);

  let updatedCard = await Card.updateOne(
    { plateNo: plateNumber },
    { $set: { lastUsing: date } }
  );
}

async function chargeTaker(plateNumber, time) {
  let foundCard = await Card.find({
    plateNo: plateNumber,
  });

  let availableBalance = foundCard[0].availableCredit;

  if (time > 1) {
    if (availableBalance < 4) {
      return {
        message: "Your credit is less than 4 dollars",
        credit: availableBalance,
      };
    } else {
      let newBalance = availableBalance - 4;

      let updatedCard = await Card.updateOne(
        { plateNo: plateNumber },
        { $set: { availableCredit: newBalance } }
      );

      return {
        message: "Success, Your credit now is " + newBalance + " dollars",
        credit: newBalance,
      };
    }
  } else {
    return { message: "Free Transiction", credit: availableBalance };
  }
}


async function updateCardNo(plate_no , updated_no){


 let check_existance_plate = await Card.exists({
    plateNo: plate_no,
  });

  let check_existance_new = await Card.exists({
    plateNo: updated_no,
  });


if (check_existance_plate && !check_existance_new){


  let updatedCard = await Card.updateOne(
    { plateNo: plate_no },
    { $set: { plateNo: updated_no } }
  );

  return {message : "Card no is updated from " +plate_no + " to "+  updated_no} ;
}else if (!check_existance_plate){
  return {message : "Card is not exist"} ;


} else if (check_existance_new){

  return {message : "The new number is already exist"} ;

}


}









module.exports = {
  createCard: createCard,
  findAllCards: findAllCards,
  checkExistance: checkExistance,
  findCardsBy: findCardsBy,
  timeSinceLastTime: timeSinceLastTime,
  assignNewTime: assignNewTime,
  chargeTaker :chargeTaker ,
  updateCardNo:updateCardNo
};
