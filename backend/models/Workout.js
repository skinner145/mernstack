/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-04T16:52:21+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:37:37+00:00
 */
const Exercise = require('./Exercise');
const User = require('./User');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//workout schema
//exercises is array made up of
//exericse, objectId from Exercises
//and sets, reps, weights which are pageNumbers
//user is an email from User
let WorkoutSchema = mongoose.Schema({
  name: String,
  exercises: [{
    exercise: {type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'},
    sets: { type: Number },
    reps: { type: Number },
    weight: { type: Number},
  }],
  user: {type: String, ref: 'User'}
})

module.exports = mongoose.model('Workout', WorkoutSchema);


//type: Schema.Types.ObjectId, ref:'Exercise'
