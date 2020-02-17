/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-04T16:46:00+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:35:59+00:00
 */

const Muscle = require('./Muscle'); //import Muscle model
const User = require('./User');//import user schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//exercise schema, name is string
//muscle is objectId from Muscle
//description is String
//user is objectId from USer
let ExerciseSchema = mongoose.Schema({
  name: String,
  muscle: {type: mongoose.Schema.Types.ObjectId, ref: 'Muscle'},
  description: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Exercise', ExerciseSchema);
