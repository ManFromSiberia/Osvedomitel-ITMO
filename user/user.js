var Database = require('../database/database.js');
Database = new Database();

function User() {
}


// function callback(err,results) {
//   console.log('Это из базы данных пришли резалты\n'+results.userID);
//   this.userOptions = results;
// }

User.prototype.addUser = function (userID) {
  var userOptions = {
    userID: userID,
    notificationNextLesson: false,
    group: null,
    notificationDay: false
  };

  Database.insert('Users',userOptions,function (err, results) {
    //console.log('это опции вернулись\n'+results);
  });
};

User.prototype.getOptions = function (userID, callback){
  var userOptions = {};
  var filter = {
   "userID": userID
 };
  Database.find("Users",filter, function(err, results) {
    userOptions = {
      userID: results[0].userID,
      notificationNextLesson: results[0].notificationNextLesson,
      group: results[0].group,
      notificationDay: results[0].notificationDay
    };
    console.log('это опции вернулись\n'+userOptions.userID);
    callback(userOptions);
  });
};







module.exports = User;
///module.exports.userOptions = this.userOptions;