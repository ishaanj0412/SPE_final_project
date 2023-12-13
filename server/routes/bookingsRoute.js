const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
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

router.post("/bookcar", async (req, res) => {
  try {
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send("Your booking is successfull");
      logger.info("Booking Succesful")

  } catch (error) {
    console.log(error);
    logger.error("Error in creating a booking");
    return res.status(400).json({message : "Somwthing Went Wrong"});
  }
});


router.get("/getallbookings", async(req, res) => {

    try {
        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        logger.info("Successfully returned all bookings");
    } catch (error) {
        logger.error("Error in getting the list of bookings");
        return res.status(400).json({message : "Something Went Wrong"});
    }
  
});


module.exports = router;
