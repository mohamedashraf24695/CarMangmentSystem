const Car = require("../models/Car");
const Person = require("../models/Person");

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

    console.log(check_existance_2);

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

async function createCar(brand, model, plateNo, ownerID) {
  let result = await checkCar(plateNo, ownerID);
  let newCar = await {
    brand: brand,
    model: model,
    plateNo: plateNo,
    ownerID: ownerID,
  };

  console.log(result);

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

async function findAllCars() {
  let result = await Car.find();
  return result;
}

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

async function updateCarBy(attribute, plate_no, update) {
  let result;

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
        // update
        result = await Car.updateOne(
          {
            plateNo: plate_no,
          },
          { $set: { ownerID: update } }
        );
      }
    } else if (attribute === "model") {
      result = await Car.updateOne(
        {
          plateNo: plate_no,
        },
        { $set: { model: update } }
      );
    } else if (attribute === "brand") {
      result = await Car.updateOne(
        {
          plateNo: plate_no,
        },
        { $set: { brand: update } }
      );
    } else if (attribute === "model") {
      result = await Car.updateOne(
        {
          plateNo: plate_no,
        },
        { $set: { plateNo: update } }
      );
    }
    return result ;

  }else {
    return "Car is not found"
  }

}

module.exports = {
  createCar: createCar,
  findAllCars: findAllCars,
  checkExistance: checkExistance,
  findCarsBy: findCarsBy,
  updateCarBy: updateCarBy,
};
