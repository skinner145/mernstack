/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-14T12:28:57+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:49:48+00:00
 */
const router = require('express').Router();

let Muscle = require('../models/Muscle')

//gets all muscles
 router.route('/').get(function(req, res) {
   Muscle.find(function(err, muscles){
     if(err){
       console.log(err)
     }
     else{
       res.json(muscles)
     }
   })
 })

//gets specific muscle
 router.route('/:id').get(function(req, res){
   let id = req.params.id;
   Muscle.findById(id, function(err, exercise){
     res.json(exercise);
   });
 });

module.exports = router;
