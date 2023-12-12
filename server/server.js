const express = require('express');
const cors = require('cors')
const port = 5000; // Change the port number to 3000
const dotenv = require('dotenv');
var bodyParser = require('body-parser')

const winston = require('winston');

const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json()); 
const dbConnection = require('./db');
dotenv.config();

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

app.use('/api/cars/', require('./routes/carsRoute'));
app.use('/api/users/', require('./routes/usersRoute'));
app.use('/api/bookings/', require('./routes/bookingsRoute'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));

module.exports = {app}
