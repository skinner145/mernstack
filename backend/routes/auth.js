/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-13T17:39:44+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:42:23+00:00
 */
 //auth routes
 //import passport and jwt for user auth
const passport = require('passport');
const settings = require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
const router = require('express').Router();

let User = require('../models/User');

router.post('/register', (req, res) => {
  //setting values to values passed with reigster route through axios
  const { body } = req;
  const {
    password
  } = body;
  let {
    email
  } = body;
  let {
    firstName
  } = body;
  let {
    lastName
  } = body;

//validating user input
  if(!firstName) {
    return res.json({
      success: false,
      message: 'Error: first name cannot be blank'
    });
  }
  if(!lastName){
    return res.json({
      success: false,
      message: 'Error: last name cannot be blank'
    });
  }
  if(!email){
    return res.json({
      success: false,
      message: 'Error: email cannot  be blank'
    })
  }
  if(!password){
    return res.json({
      success: false,
      message: 'Error: password cannot be blank'
    });
  }
  //setting email to lowercase and trimming it
  email = email.toLowerCase();
  email = email.trim();
//mkaing sure the user does not already exist
  User.find({
    email: email
  },(err, previousUsers) => {
    if(err){
      return res.json({
        success: false,
        message: 'Error: Server Error'
      });
    }
    else if(previousUsers.length > 0) {
      return res.json({
        success: false,
        message: 'Error: Account already exists'
      });
    }
    //create new user using User model
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if(err){
        return res.json({
          success: false,
          message: 'Error: server error'
        });
      }
      //create session for user
      let token = jwt.sign(user.toJSON(), process.env.API_SECRET);
      return res.json({
        success: true,
        message: 'Account created for user',
        token: 'JWT ' + token
      });
    });
  });
});

router.post('/login', (req, res)=> {
  //setting variables to values passed with axios login route
  const { body } = req;
  const { password } = body;
  let { email } = body;
//validating the user input
  if(!email) {
    return res.json({
      success: false,
    message: 'Error: Email cannot be blacnk'
  });
  }
  if(!password) {
    return res.json({
      success: false,
      message: 'Error: Password cannot be blank'
    });
  }
  //setting email to lowercase and trim
  email = email.toLowerCase().trim();

  //checking is user exists
  User.findOne({ email }, function(err, user) {
    if(err) throw(err);

    if(!user){
      res.status(401).json({success: false, message: 'Authentication failed. User not found'});
    }
    else{
      //if user exists create session and information correct 
      if(user.validPassword(password)){
        let token = jwt.sign(user.toJSON(), process.env.API_SECRET);
        res.json({success: true, token: 'JWT ' + token});
      }
      else {
        res.status(401).json({success: false, message: 'Authentication failed. Wrong password.'});
      }
    }
  });
})
module.exports = router;
