/**
 * Содержит чётность недели
 * @type {{BOTH: number, ODD: number, EVEN: number}}
 */
module.exports.WEEK_PARITY = {
  BOTH: 0,
  ODD: 1,
  EVEN:  2
};

/**
 * Содержит дни недели
 * @type {{ALL: number, MONDAY: number, TUESDAY: number, WEDNESDAY: number, THURSDAY: number, FRIDAY: number, SATURDAY: number, SUNDAY: number}}
 */
var WEEK_DAY = {
  ALL: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
  getTomorrow: getTomorrow
};

function getTomorrow() {
  var date = new Date();
  date.setDate(date.getDate() + 1);
  var weekDay = [7, 1, 2, 3, 4, 5, 6];
  return weekDay[date.getDay()];
}

module.exports.WEEK_DAY = WEEK_DAY;