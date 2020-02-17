/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-14T14:57:45+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-14T14:58:04+00:00
 */
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

 module.exports = getToken
