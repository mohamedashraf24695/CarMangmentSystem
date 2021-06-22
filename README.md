# CarMangmentSystem

## ERD Diagram 

<img src="https://github.com/mohamedashraf24695/CarMangmentSystem/blob/master/ERD.png">

1) **One employee can only have one car with only one card**
2) I assumed that the card number will be unique and also the plate number should be unique, so we can use plate number on cards as its own number. By that we made the plate number as a primary key for the cards and a part of a composite key for cars.
3) **I tried to cover all edge cases for all scenarios**



## CRUD Operations on the database:

### 1-Create 
1)	Person : you can create a person (name , age , position ) with a unique ID ( for example you can use the national ID or any natural ID) 
2)	Person : you can create a new person if the unique ID is not available in the database, otherwise, you will not be able to do that
3)	Car : you can create a car with (model,brand,ownerID,plateNumber)
4)	Car : plateNumber is unique for each car, so you can’t create a car with an already existing plateNumber 
5)	Car : the car owner should be an employee , you can’t set ownerID with a person’s unique ID that is not exist in people collection 
6)	Card : you can create a card ( availableCredit,createdAt,lastUsing,plateNo) with a unique plateNo
7)	Card: you can’t create a card with non-existed plate number in the cars’ collection or a plateNumber is already taken in the card’s collection.

### 2-Read : 
 (For all collections) 
1)	You can read the whole collection
2)	You can read all elements with a specific attribute, for example: read all cars with a certain brand or all people with a certain age, etc. 




### 3-Update :
1) Person : you can update any of the person’s attributes 
2)	Person : when an update operation occur on unique ID, it automatically change the ownerID of the associated car , so the same person will still point to the same car and the same card 
3)	Car :  you can update any of the car’s attributes
4)	Car: when an update operation occurs on the plateNo, it automatically change the plateNo in the associated card. 
5)	Car : you can’t update the plateNo with an already existed plateNo of another car 
6)	Car :  when an update operation occurs on the ownerID
 , it must be an employee and an employee without any associated car to make sure each employee (person) have one car
7)	Card: you can change the plateNo of a card.
8)	Card : you can’t change the plateNo if the new plateNo is associated to another car or if the new plateNo is not related to a car in the cars’ collection 

### 4-Delete 
1)	Person : you can delete a person using the unique ID 
2)	Person : when you delete a person , automatically, the associated car and the associated card will be deleted
3)	Person: you can clean all people’s database and it will automatically delete all associated cars and cards
4)	Car : you can delete a car using the plateNo
5)	Car : when you delete a car , automatically , the associated card will be deleted 
6)	Car : you can delete all cars and it will automatically delete all associated cards
7)	Card : you can delete a card using the plateNo 
8)	Card : you can delete all cards

## CRUD APIs 

### Person

1)	/api/person/create   (POST REQ) 

Body:
 *     - name : type : String , required
 *     - position: type : String , required
 *     - age : type : Number , required
 *     - uniqueID : type : Number , required

2)	/api/person/read/all (GET REQ)


3)	/api/person/read/ :prop/:prop_id (GET REQ) 

  * YOU MUST TYPE THEM AS THEY ARE WRITTEN HERE 

4)	 /api/person/update/:unique_id  (PATCH REQ)

5)	/api/person/delete/:unique_id  (DELETE REQ)
6)	/api/person/deleteAll  (DELETE REQ)

### Car

1)	  /api/car/create   (POST REQ)

  Body: 
- brand: type: String, required
 - model: type: String, required
 - plateNo: type: Number, required
 - ownerID: type: Number, required

2)	/api/ car /read/all (GET REQ)

3)	/api/ car /read/ :prop/:prop_id (GET REQ)

 * YOU MUST TYPE THEM AS THEY ARE WRITTEN HERE 

4)	 /api/ car /update/: plate_id (PATCH REQ)

5)	/api/ car /delete/: plate_id  (DELETE REQ)

6)	/api/ car /deleteAll  (DELETE REQ)

### Card

1)	  /api/card/create   (POST REQ)

  Body: 

 - plateNo: type: Number, required


2)	/api/ card /read/all (GET REQ)

3)	/api/ card /read/ :prop/:prop_id (GET REQ)

 * YOU MUST TYPE THEM AS THEY ARE WRITTEN HERE 

4)	 /api/ card /update/: plate_id (PATCH REQ)

5)	/api/ card /delete/: plate_id  (DELETE REQ)

6)	/api/ card /deleteAll  (DELETE REQ)


## Register API 

**/api/register/       (POST REQ)**


   Body: 
 - brand: type: String, required
 - model: type: String, required
 - plateNo: type: Number, required
 - ownerID: type: Number, required

### description

-	You can register a new car to an employee 
- You can’t register if the person is not an employee
-	You can’t register if the plateNo is assigned to another car 
-	You can’t register an already registered employee
-	If Register success , employee will get 10$ as initial credit 

## deduct API 

**/api/deduct/ (POST REQ)**

 Body: 

 - plateNo: type: Number, required
 
### description

-	The API simulate a deduct mechanism using the plateNo
-	If the time between two successive deducts or time between the registration and first deduct is less than one minute , API will not deduct money (free) and return json message

  return { message: "Free Transiction", credit: availableBalance };

-	If the employee hasn’t enough credit , it will return json message 

 return {
        message: "Your credit is less than 4 dollars",
        credit: availableBalance,
      };

-	If card is having 4 dollars at least and time between two successive charges is more than 1 minute

return {
        message: "Success, Your credit now is " + newBalance + " dollars",
        credit: newBalance,
      };
-	If the plate doesn’t exist in the cards’ collection , the return will be 

 res.json({  message: "The plate doesn't exist" });


-	The API simulate a deduct mechanism using the plateNo
-	If the time between two successive deducts or time between the registration and first deduct is less than one minute , API will not deduct money (free) and return json message

  return { message: "Free Transiction", credit: availableBalance };

-	If the employee hasn’t enough credit , it will return json message 

 return {
        message: "Your credit is less than 4 dollars",
        credit: availableBalance,
      };

-	If card is having 4 dollars at least and time between two successive charges is more than 1 minute

return {
        message: "Success, Your credit now is " + newBalance + " dollars",
        credit: newBalance,
      };
-	If the plate doesn’t exist in the cards’ collection , the return will be 

 res.json({  message: "The plate doesn't exist" });

## ChargingCard API 

**/api/chargeCard/:plate_no  (POST REQ)**

  Body: 
- chargeAmount: type: Number, required 

### description

-	The API simulate adding credit to the card 

-	If the API supported by non-numeric value it returns 
	 return {
	        message: "Charge amount is not a number"   
	      };

-	If the API supported by non-exist card 


return {
      message: "PlateNo is not exist"   
    };

-	If the API is successfully charge your card 


	 return {
	      message: "Success, Your credit now is " + newBalance + " dollars",
	      credit: newBalance,
    }



## How to run it 

1)	Pull the code from github rep 
2)	Run command : “npm i”  to install node modules 
3)	Run command : “npm run start” to start the server 
4)	Use Postman to run the requests 


## How to use it as service

1) use create employee api to create employees in your database 
2) use car api to create cars and card api to create cards 
or 
2) use register api to create both of them by such one api 
3) use dedcut api to perfom duduct actions on cards 
4) use charging api to charge the cards 

YOU MUST HAVE EMPLOYEE IN YOUR DATA BASE 










