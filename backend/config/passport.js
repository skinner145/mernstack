/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-13T17:23:59+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-14T11:40:54+00:00
 */
 const JwtStrategy = require('passport-jwt').Strategy;
 const ExtractJwt = require('passport-jwt').ExtractJwt;

 let User = require('../models/User');
 const secret = "mernauth";

 module.exports = function(passport) {
   var opts = {};
   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
   opts.secretOrKey = secret;
   passport.use(new JwtStrategy(opts, function(jwt_payload, done){
     User.findOne({id: jwt_payload.id}, function(err, user) {
       if(err) {
         return done(err, false);
       }
       if(user) {
         done(null, user);
       }
       else{
         done(null, false);
       }
     });
   }));
 }
