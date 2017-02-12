const paths = require('../config/config.js');
var IsuApiToken = require('../config/IsuApiToken.js');
var request = require("request")

module.exports.WEEKPARITY = {
  BOTH: 0,
  EVEN: 1,
  ODD:  2
}

module.exports.WEEKDAY = {
  ALL: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7
}

module.exports.getGroup = function (groupName, weekDay, weekParity) {
  var url = paths.host + paths.basepath + '/schedule/common/group/'+ IsuApiToken + '/' + groupName;

  var options = {
    url: url,
    json: false
  };

  var schedule;
  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      schedule = JSON.parse(body);
    }else{
      return null;
    }
  });
};
