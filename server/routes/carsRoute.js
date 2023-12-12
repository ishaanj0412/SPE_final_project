const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");
const winston = require("winston")

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
    logger.info("Successfully fetched list of all cars");
  } catch (error) {
    logger.error("Error in fetching list of cars");
    return res.status(400).json({message : "Something went wrong"});
  }
});

router.post("/addcar", async (req, res) => {
  try {
    const newcar = new Car(req.body);
    if(req.body.rentPerHour <= 0 || !req.body.rentPerHour === 'number'){
      logger.warn("Error in creating a car: Please enter positive value for rent");
      return res.status(400).json({ message: 'RentPerHour must be a positive number!' });
    }
    if(req.body.capacity <= 0 || !req.body.capacity === 'number'){
      logger.warn("Error in creating a car: Please enter positive value for capacity");
      return res.status(400).json({ message: 'Capacity must be a positive number!' });
    }
    await newcar.save();
    res.send("Car added successfully");
    logger.info("Created a new car successfully");
  } catch (error) {
    logger.error("Unable to create a new car");
    return res.status(400).json({message : "Something went wrong"});
  }
});

router.post("/editcar", async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });
    if(req.body.rentPerHour <= 0 || !req.body.rentPerHour === 'number'){
      logger.warn("Error in editing a car: Please enter positive value for rent");
      return res.status(400).json({ message: 'RentPerHour must be a positive number!' });
    }
    if(req.body.capacity <= 0 || !req.body.capacity === 'number'){
      logger.warn("Error in editing a car: Please enter positive value for capacity");
      return res.status(400).send({ message: 'Capacity must be a positive number!' });
    }
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;

    await car.save();

    res.send("Car details updated successfully");
    logger.info("Edited the car successfully");
  } catch (error) {
    logger.error("Error in editing the car");
    return res.status(400).json({message : "Something went wrong"});
  }
});

router.post("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.send("Car deleted successfully");
    logger.info("Car deleted successfully");
  } catch (error) {
    logger.info("Error in deleting the car");
    return res.status(400).json({message : "Something went wrong"});
  }
});

module.exports = router;
