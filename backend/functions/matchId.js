/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-14T14:58:36+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-14T14:58:47+00:00
 */
 const matchId = (id1, id2) => {
   if(('"' + id1 + '"') === ('"' + id2 + '"')){
     return true
   }
   else{
     return false;
   }
 }

 module.exports = matchId;
