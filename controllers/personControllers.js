const Person = require("../models/Person");
const carControllers = require("../controllers/carControllers");

async function checkPerson(uniqueID) {
  try {
    let check_existance = await Person.exists({
      uniqueID: uniqueID,
    });

    if (check_existance) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error.message;
  }
}

async function createPerson(name, position, age, uniqueID) {
  let result = await checkPerson(uniqueID);
  let newperson = await {
    name: name,
    position: position,
    age: age,
    uniqueID: uniqueID,
  };

  if (result === true) {
    return "Peson is exist";
  } else if (result === false) {
    await Person.create(newperson);

    return "The person is created";
  } else {
    return -400;
  }
}

async function findAllPeople() {
  let result = await Person.find();
  return result;
}

async function findPeopleBy(attribute, value) {
  let result;

  if (attribute == "name") {
    result = await Person.find({
      name: value,
    });
  } else if (attribute == "position") {
    result = await Person.find({
      position: value,
    });
  } else if (attribute == "age") {
    result = await Person.find({
      age: value,
    });
  } else if (attribute == "uniqueID") {
    result = await Person.find({
      uniqueID: value,
    });
  }

  return result;
}

async function checkExistance(attribute, value) {
  let result;

  if (attribute == "name") {
    result = await Person.exists({
      name: value,
    });
  } else if (attribute == "position") {
    result = await Person.exists({
      position: value,
    });
  } else if (attribute == "age") {
    result = await Person.exists({
      age: value,
    });
  } else if (attribute == "uniqueID") {
    result = await Person.exists({
      uniqueID: value,
    });
  }

  return result;
}

async function updatePeopleBy(attribute, unique_id, update) {
  let result;

  if (attribute == "name") {
    result = await Person.updateOne(
      {
        uniqueID: unique_id,
      },
      { $set: { name: update } }
    );

    return { message: "Name is updated" };

  } else if (attribute == "position") {
    result = await Person.updateOne(
      {
        uniqueID: unique_id,
      },
      { $set: { position: update } }
    );

    return { message: "Position  is updated" };

  } else if (attribute == "age") {
    result = await Person.updateOne(
      {
        uniqueID: unique_id,
      },
      { $set: { age: update } }
    );

    return { message: "Age  is updated" };

  } else if (attribute == "uniqueID") {
    let idExistance = await Person.exists({
      uniqueID: update,
    });

    if (idExistance){

      return { message: "Unique ID is already exist" };


    }else if (!idExistance){
       await Person.updateOne(
        {
          uniqueID: unique_id,
        },
        { $set: { uniqueID: update } }
      );
  
      let associatedCar = await carControllers.findCarsBy("ownerID",unique_id) ; 
      console.log(associatedCar)
      let plateNumber = await associatedCar[0].plateNo ;
      console.log("Plate number is "+ plateNumber) ;
      await carControllers.updateCarBy("ownerID",plateNumber,update) ;

      return { message: "Unique ID is updated and the associated car owner number" };

    }



   


  }

  console.log(result);
}

module.exports = {
  createPerson: createPerson,
  findAllPeople: findAllPeople,
  findPeopleBy: findPeopleBy,
  checkExistance: checkExistance,
  updatePeopleBy: updatePeopleBy,
};
