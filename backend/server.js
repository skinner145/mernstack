/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-03T15:07:24+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-09T18:27:39+00:00
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const exerciseRoutes = require('./routes/exercise');
const muscleRoutes = require('./routes/muscle');;
const workoutRoutes = require('./routes/workout');
const authRouter = require('./routes/auth');
const path = require('path');
const port = process.env.PORT || 4000;


require('dotenv').config();
const uri = process.env.ATLAS_URI;
app.use(cors());
app.use(bodyParser.json());



mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('mongodb database connection established successfully');
});


app.use('/exercises', exerciseRoutes)
app.use('/muscles', muscleRoutes)
app.use('/workouts', workoutRoutes)
app.use('/account', authRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('../build'));
  app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
}

app.listen(port, function() {
  console.log('Server running on port: ' + port);
});
