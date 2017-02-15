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
  SUNDAY: 7
};

Object.defineProperty(WEEK_DAY, "TOMORROW", {
  get: function() {
    var date = new Date();
    date.setDate(date.getDate() + 1);
    var weekDay = [7, 1, 2, 3, 4, 5, 6];
    return weekDay[date.getDay()];
  }
});

module.exports.WEEK_DAY = WEEK_DAY;

module.exports.WEEK_DAY_STRING = {
  1: 'ПОНЕДЕЛЬНИК',
  2: 'ВТОРНИК',
  3: 'СРЕДА',
  4: 'ЧЕТВЕРГ',
  5: 'ПЯТНИЦА',
  6: 'СУББОТА',
  7: 'ВОСКРЕСЕНЬЕ'
};

module.exports.WEEK_PARITY_STRING = {
  0: '',
  1: 'нечёт',
  2: 'чёт'
};

module.exports.MONTHS_STRING_SHORT = {
  1: 'янв',
  2: 'фев',
  3: 'мар',
  4: 'апр',
  5: 'май',
  6: 'июн',
  7: 'июл',
  8: 'авг',
  9: 'сен',
  10: 'окт',
  11: 'ноя',
  12: 'дек'
};

module.exports.MONTHS_STRING_LONG = {
  1: 'Января',
  2: 'Февраля',
  3: 'Марта',
  4: 'Апреля',
  5: 'Мая',
  6: 'Июня',
  7: 'Июля',
  8: 'Августа',
  9: 'Сентября',
  10: 'Октября',
  11: 'Ноября',
  12: 'Декабря'
};