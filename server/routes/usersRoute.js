const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
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

router.post("/login", async(req, res) => {

      const {username , password} = req.body

      try {
          const user = await User.findOne({username , password})
          if(user) {
              res.send(user)
              logger.info("Logged in successfully")
          }
          else{
              logger.warn("Incorrect username or password")
              return res.status(400).json({message : "Incorrect username or password"});
          }
      } catch (error) {
        logger.error("Error in logging in");
        return res.status(400).json({message : "Something went wrong"});
      }
  
});

router.post("/register", async(req, res) => {
    const all_usernames = await User.aggregate([
        {
            $match:{
                username : req.body.username
            }
        }
    ]);
    if(all_usernames.length == 0){
        try {
            const newuser = new User(req.body)
            await newuser.save()
            res.send('User registered successfully')
            logger.info("User created successfully")
        } catch (error) {
            logger.error("Something Went Wrong")
          return res.status(400).json(error);
        }
    }
    else{
        logger.warn('Create user aborted: Username already in use');
		return res.status(400).json({message: "Username in use"});
    }
});


module.exports = router

