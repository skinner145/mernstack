/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-14T11:58:49+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T15:00:47+00:00
 */
 const passport = require('passport');
 const settings = require('../config/passport')(passport);
 const jwt = require('jsonwebtoken');
 const router = require('express').Router();
const ExtractJwt = require('passport-jwt').ExtractJwt;

//ussed to get token
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

 let Workout = require('../models/Workout');

//gets all workouts
 router.route('/').get((req, res) => {
   Workout.find((err, workouts) => {
     if(err){
       console.log(err);
     }
     else{
       res.json(workouts)
     }
   })
 })

//gets specific workout
 router.route('/:id').get(function(req, res){
   let id = req.params.id;
   Workout.findById(id, function(err, workout){
     res.json(workout)
   }).populate('exercises.exercise')
 })

//gets specific workout exercise
 router.route('/:wid/exercises/:eid').get((req, res) => {
   const workoutId = req.params.wid
   const exerciseId = req.params.eid
   //finds workout by id
   Workout.findById(workoutId, function(err, workout){
     //finds exercise by id
     res.json(workout.exercises.id(exerciseId))
   })
 })

//creates workout
 router.route('/create').post(passport.authenticate('jwt', { session: false}), (req, res) => {
   //gets token
   const token = getToken(req.headers);
   //sets object passed in axios to workout constant
   const workout = req.body;
   //if user logged in
   if(token){
     //validating
     if(!workout.name){
       return res.staatus(400).json({
         message: 'Workout name cannot be blank'
       })
     }
     //creates new workout from User model
     const newWorkout = new Workout(workout);
     //saves workout
     newWorkout.save()
     .then(
       data=> {
         res.json(data)
       }
     )
     .catch(err => res.status(400).json('Error: ' + err));
   }
   else{
     return res.status(403).json({success: false, message: 'Unauthorized'})
   }
 })

 //creates new exercise in specific workout
 router.route('/:wid/exercises/create').post(passport.authenticate('jwt', { session: false}), (req, res) => {
   //getts token
   const token = getToken(req.headers);
   //id from axios route set to workoutId
   const workoutId = req.params.wid;

   //if user logged in
   if(token){
     //find workout by workoutId
   Workout.findById(workoutId)
   .then(workout => {
     if(!workout){
       return res.status(404).json({
         message: 'Workout not found with id ' + workoutId
       });
     }
     //push passed object to exercises array
     workout.exercises.push(req.body)
     //save workout
     workout.save()
     .then(workout => {
       res.status(200).json({'exercise': 'exercise added successfully'})
     })
     .catch(err => {
       res.status(400).send('adding exercise failed')
     });
   })
 }
 else{
   return res.status(403).json({success: false, message: 'Error'})
 }
 })

//update sepcific exercise in specific workout
 router.route('/:wid/exercises/:eid').put(passport.authenticate('jwt', { session: false}), (req, res) => {
   const workoutId = req.params.wid; //workout id
   const exerciseId = req.params.eid; //exerciseId

   //constants declared for each value of exercise
   const newExercise = req.body.exercise;
   const newSets = req.body.sets;
   const newReps = req.body.reps;
   const newWeight = req.body.weight

   //gets token
   const token = getToken(req.headers);
   //if user logged in
   if(token){
     //find workout by id
     Workout.findById(workoutId)
     .then(workout => {
       if(!workout){
         return res.status(404).json({
           message: 'Workout not found with id ' + workoutId
         });
       }
       //sets each value of exercises to consta declared earlier
       let e = workout.exercises.id(exerciseId)
       e.exercise = newExercise
       e.sets = newSets
       e.reps = newReps
       e.weight = newWeight
       res.json({message: e});
       workout.save()
     })
     .catch(err => {
       if(err.kind === 'ObjectId'){
         return res.status(404).json({
           message: "Workout not found with id " + workoutId
         })
       }
       return res.status(500).json({
         message: 'could not update ' + workoutId
       })
     })
   }


 })

//delete specific exericse of workout
 router.route('/:wid/exercises/:eid').delete(passport.authenticate('jwt', { session: false}), (req, res) => {
   const workoutId = req.params.wid; //workoutId
   const exerciseId = req.params.eid; //exerciseId
   //gets token
   const token = getToken(req.headers);
   //if user logged in
   if(token){
     //find workout by id
     Workout.findById(workoutId)
     .then(workout => {
       if(!workout) {
         return res.status(404).json({
           message: 'Workout not found with id ' + workoutId
         });
       }
       //find exercise by id and removes it
         workout.exercises.id(exerciseId).remove();
         //saves workout
         workout.save(function (err) {
           if (err) return handleError(err);
           console.log('the subdocs were removed');
         });
       res.json({message: 'Exercise deleted successfully'});
       console.log(exercises)
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


//delete sepcifc workout
 router.route('/:id').delete(passport.authenticate('jwt', { session: false}), (req, res) => {
   const workoutId = req.params.id;
   //get token
   const token = getToken(req.headers);
   if(token){
     //find workout by id and remove it
     Workout.findByIdAndRemove(workoutId)
     .then(workout => {
       res.json({ success: true, message: 'Workout deleted'})
     })
     .catch(err =>{
       res.json(err)
     })
   }
   else{
     return res.status(403).json({message: 'Token does not match'})
   }
 })



module.exports = router
