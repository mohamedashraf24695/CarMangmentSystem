const Car = require("../models/Car");
const Card = require("../models/Card");

const Person = require("../models/Person");
const cardControllers = require("../controllers/cardControllers");
/********************************************************************************************************************************* */

/**************************************************************************************************************
 * Function name : checkCar (local function)
 * arguments : plateNo , ownerID
 * return : integer indicate the car case : 
 *  1- Car already exist or not 
 *  2- Owner owns another car or not 
 *  3- Owner is a real employee 
 *  4- plate number is unique or not 

 ************************************************************************************************************/

async function checkCar(plateNo, ownerID) {
  try {
    let check_existance_person = await Person.exists({
      uniqueID: ownerID,
    });

    let full_check_existance = await Car.exists({
      plateNo: plateNo,
      ownerID: ownerID,
    });

    let check_existance_plate = await Car.exists({
      plateNo: plateNo,
    });

    let check_existance_owner = await Car.exists({
      ownerID: ownerID,
    });

    let check_existance_2 = await Car.exists({
      plateNo: plateNo,
      ownerID: ownerID,
    });

    if (!check_existance_person) {
      return -1;
    } else if (full_check_existance) {
      return -2;
    } else if (check_existance_owner) {
      return -3;
    } else if (check_existance_plate) {
      return -4;
    } else {
      return true;
    }
  } catch (error) {
    return error.message;
  }
}
/********************************************************************************************************************************* */

/******************************************************************************************************************
 * Function name : createCar 
 * arguments : brand, model, plateNo, ownerID
 * return : json object with a message String explain the performed operations due to the inputs
 *  1- "The employee is not in the database"
 *  2-"Car is exist" 
 *  3- "Car is exist with other person"
 *  4-  "The Car is created " 
 *   ***  and in this case function creates a car and store it in database

 ************************************************************************************************************/

async function createCar(brand, model, plateNo, ownerID) {
  let result = await checkCar(plateNo, ownerID);
  let newCar = await {
    brand: brand,
    model: model,
    plateNo: plateNo,
    ownerID: ownerID,
  };

  if (result === -1) {
    return "The employee is not in the database";
  } else if (result === -2) {
    return "Car is exist";
  } else if (result === -3) {
    return "The user is having another car";
  } else if (result === -4) {
    return "Car is exist with other person";
  } else if (result === true) {
    await Car.create(newCar);
    return "The Car is created";
  } else {
    return -400;
  }
}
/********************************************************************************************************************************* */

/******************************************************************************************************************
 * Function name : findAllCars
 * arguments : no arguments
 * return : All Car objects in database
 */

async function findAllCars() {
  let result = await Car.find();
  return result;
}
/********************************************************************************************************************************* */

/*******
 * Function name : checkExistance 
 * arguments :attribute, value
 * return : true or false 
 description: passing the attribute (model ,plateNo , brand or ownerID) and a value of it 
 if the a car with this value , it will return true , otherwise, it will return false 

 ************************************************************************************************************/

async function checkExistance(attribute, value) {
  let check_existance = false;

  if (attribute === "model") {
    check_existance = await Car.exists({
      model: value,
    });
  } else if (attribute === "plateNo") {
    check_existance = await Car.exists({
      plateNo: value,
    });
  } else if (attribute === "brand") {
    check_existance = await Car.exists({
      brand: value,
    });
  } else if (attribute === "ownerID") {
    check_existance = await Car.exists({
      ownerID: value,
    });
  }

  return check_existance;
}
/********************************************************************************************************************************* */

/******************************************************************************************************************
 * Function name : findCarsBy 
 * arguments :attribute, value
 * return : a car object
 description: passing the attribute (model ,plateNo , brand or ownerID) and a value of it 
 it will return objects matching 

 ************************************************************************************************************/

async function findCarsBy(attribute, value) {
  let result;

  if (attribute == "model") {
    result = await Car.find({
      model: value,
    });
  } else if (attribute == "plateNo") {
    result = await Car.find({
      plateNo: value,
    });
  } else if (attribute == "brand") {
    result = await Car.find({
      brand: value,
    });
  } else if (attribute == "ownerID") {
    result = await Car.find({
      ownerID: value,
    });
  }

  return result;
}
/********************************************************************************************************************************* */

/******************************************************************************************************************
 * Function name : updateCarBy
 * arguments :attribute, plate_no, update
 * return : json object with a message String explain the performed operations due to the inputs
 * 1-Owner is not an employee
 * 2-Owner own another car
 * 3-Car's model is updated
 * 4-Car's brand is updated
 * 5-"New Plate number is already exist for another can
 * 6- "Car's plate number is updated and also the corresponding card"
 * 7 - "Car is not found"
 ************************************************************************************************************/

async function updateCarBy(attribute, plate_no, update) {
  let check_existance_plate = await Car.exists({
    plateNo: plate_no,
  });

  if (check_existance_plate) {
    if (attribute === "ownerID") {
      let check_existance_person = await Person.exists({
        uniqueID: update,
      });

      let check_existance_owner = await Car.exists({
        ownerID: update,
      });

      if (check_existance_person && !check_existance_owner) {
        await Car.updateOne(
          {
            plateNo: plate_no,
          },
          { $set: { ownerID: update } }
        );

        return { message: "Car is updated" };
      } else {
        if (!check_existance_person) {
          return { message: "Owner is not an employee" };
        } else if (check_existance_owner) {
          return { message: "Owner own another car " };
        }
      }
    } else if (attribute === "model") {
      await Car.updateOne(
        {
          plateNo: plate_no,
        },
        { $set: { model: update } }
      );

      return { message: "Car's model is updated " };
    } else if (attribute === "brand") {
      await Car.updateOne(
        {
          plateNo: plate_no,
        },
        { $set: { brand: update } }
      );

      return { message: "Car's brand is updated " };
    } else if (attribute === "plateNo") {
      let check_existance_new_plate = await Car.exists({
        plateNo: update,
      });

      if (check_existance_new_plate) {
        return {
          message: "New Plate number is already exist for another can ",
        };
      } else if (!check_existance_new_plate) {
        await Car.updateOne(
          {
            plateNo: plate_no,
          },
          { $set: { plateNo: update } }
        );

        await cardControllers.updateCardNo(plate_no, update);

        return {
          message:
            "Car's plate number is updated and also the corresponding card",
        };
      }
    }
  } else {
    return { message: "Car is not found" };
  }
}
/********************************************************************************************************************************* */

/****************************************************************************************************
 * Function name : deleteCar
 * arguments :plate_no
 * return : json object with a message String explain the performed operations due to the inputs
 * 1-"The car and its card are deleted successfully"
 * 2-"The card is not exist "
 **************************************************************************************************/


async function deleteCar(plate_no) {
  let check_existance_plate = await Car.exists({
    plateNo: plate_no,
  });

  if (check_existance_plate) {
    await Car.deleteOne({ plateNo: plate_no });
    await Card.deleteOne({ plateNo: plate_no });

    return { message: "The car and its card are deleted successfully" };
  } else if (!check_existance_plate) {
    return { message: "The card is not exist " };
  }
}

/************************************************************************************************************************************* */
async function deleteAll(){

  await cardControllers.deleteAll();
  await Car.deleteMany();


  return {message : "The cars and associated cards are deleted successfully " } ;


}






/********************************************************************************************************************************* */
module.exports = {
  createCar: createCar,
  findAllCars: findAllCars,
  checkExistance: checkExistance,
  findCarsBy: findCarsBy,
  updateCarBy: updateCarBy,
  deleteCar: deleteCar,
  deleteAll:deleteAll
};
/********************************************************************************************************************************* */
