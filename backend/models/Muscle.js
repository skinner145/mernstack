/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-05T13:13:50+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:34:32+00:00
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//muscle schema, name is tring
let MuscleSchema = mongoose.Schema({
  name: String
})

module.exports = mongoose.model('Muscle', MuscleSchema);
