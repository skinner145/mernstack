/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-14T12:31:28+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:49:32+00:00
 */
 const passport = require('passport');
 const settings = require('../config/passport')(passport);
 const jwt = require('jsonwebtoken');
 const router = require('express').Router();

//import exercise model
let Exercise = require('../models/Exercise');

//used to get jwt token passed with routes
const getToken = (headers) => {
  if(headers && headers.authorization){
    let parted = headers.authorization.split(' ');
    if(parted.length === 2){
      return parted[1]
    }
    else{
      return null;
    }
  }
  else {
    return null;
  }
};

//returns all exercises
//populates muscle so muscle id returns all muscle values
 router.route('/').get(function(req, res){
   Exercise.find().populate('muscle')
   .then(function(exercises) {
       res.json(exercises)
   })
   .catch(function(err) {
       console.log(err);
   });
 });

//returns specific exercise
//populates muscle
 router.route('/:id').get(function(req, res){
   let id = req.params.id;
   Exercise.findById(id, function(err, exercise){
     res.json(exercise);
   }).populate('muscle');
 });

//creates new exericse
 router.route('/create').post(passport.authenticate('jwt', { session: false}), (req, res) => {
   //retrieving token
   const token = getToken(req.headers);
   //checking if user is logged in
   if(token){
     //create new exercise from Exercise model and saves it
   let exercise = new Exercise(req.body);
   exercise.save()
   .then(exercise => {
     res.status(200).json({'exercise': 'exercise added successfully'})
   })
   .catch(err=> {
     res.status(400).send('adding new exercise failed')
   });
 }
 });

//updating specific exercise
 router.route('/:id').put(passport.authenticate('jwt', { session: false}), (req, res) => {
   //storing id passed in axios as exerciseId
   const exerciseId = req.params.id;


   //gets token
   const token = getToken(req.headers);
   //if user is logged in
   if(token){
     //find exercise with matching id
     Exercise.findById(exerciseId)
     .then(exercise => {
       if(!exercise){
         return res.status(404).json({
           message: 'Exercise not found with id ' + exerciseId
         })
       }

        //setting exercise values to each value passed in object
         let e = exercise;
         e.name = req.body.name
         e.muscle = req.body.muscle
         e.description = req.body.description
         exercise.save();
     })
   }
   //validating
   if(!newExercise.name){
     return res.status(400).json({
       message: 'Exercise name cannot be blank'
     });
   }

 })

//delete specific exercise
 router.route('/:id').delete(passport.authenticate('jwt', { session: false}), (req, res) => {
   //id passed in axios route
   const exerciseId = req.params.id;
   //gets token
   const token = getToken(req.headers);
   //checks if user logged in
   if(token){
     //finds exercise by id
     Exercise.findById(exerciseId)
     .then(exercise => {
       if(!exercise) {
         return res.status(404).json({
           message: 'Exercise not found with id ' + exerciseId
         });
       }
       //remove exercise 
        exercise.remove({'_id': exerciseId})
        res.json({message: 'Exercise deleted successfully'});

     })
     .catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound'){
         return res.status(400).json({
           message: 'Exercise not found with id ' + exerciseId
         });
       }
       return res.status(500).send({
         message: 'Could not delete exercise with id ' + exerciseId
       })
     })
   }


 })

 module.exports = router;
