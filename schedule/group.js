/**
 * Содержит путями к API ISU
 * @type {object}
 */
const paths = require('../config/IsuApiURL.js');

/**
 * Содержит токен для использования API ISUПодключаем файл с путями к API ISU
 * @type {string}
 */
const IsuApiToken = require('../config/IsuApiToken.js');

/**
 * Модуль для работы с http[s]-запросами
 * @type {function}
 */
var request = require('request');

/**
 * Содержит константы чётности недели и дней недели
 * @type {object}
 */
const options = require('./options.js');

/**
 * Содержит дни недели
 * @type {object}
 */
const WEEK_DAY = options.WEEK_DAY;

/**
 * Содержит чётность недели
 * @type {object}
 */
const WEEK_PARITY = options.WEEK_PARITY;

/**
 * Создает экземпляр класса Group
 *
 * @param {string} groupName номер группы
 * @this {Group}
 * @constructor
 */
function Group(groupName) {
  this.groupName = groupName;
}

/**
 * Получает расписание занятий групп по указанным параметрам и передаёт результат в callback-функцию
 * @param {number} weekDay день недели
 * @param {number} weekParity чётность недели
 * @param {function} callback callback-фукнция, получающая результат на обработку
 */
Group.prototype.getSchedule = function(weekDay, weekParity, callback) {
  if(weekDay === WEEK_DAY.TOMORROW){

  }
  /**
   * Опции для запроса
   * Подробнее: https://www.npmjs.com/package/request#requestoptions-callback
   */
  var url = paths.host + paths.basepath + '/schedule/common/group/'+ IsuApiToken + '/' + this.groupName;
  var options = {
    url: url,
    json: true
  };

  /**
   * Вызов ассинхронной функции https-запроса по указанному в options url
   */
  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var schedule = body.faculties[0].departments[0].groups[0].study_schedule;
      var result = [];

      if (weekDay === WEEK_DAY.ALL){
        for (var day = 0, len = schedule.length; day < len; day++) {
          var item = {};
          item.weekday = schedule[day].weekday;
          item.lessons = [];

          for (var i = 0, len2 = schedule[day].lessons.length; i < len2; i++){
            if(weekParity === WEEK_PARITY.BOTH){
              item.lessons.push(schedule[day].lessons[i]);
            }else{
              if(schedule[day].lessons[i].parity === weekParity || schedule[day].lessons[i].parity === WEEK_PARITY.BOTH){
                item.lessons.push(schedule[day].lessons[i]);
              }
            }
          }
          result.push(item);
        }
      }else {
        var item = {};
        item.weekday = weekDay;
        item.lessons = [];

        for (var i = 0, len = schedule[weekDay-1].lessons.length; i < len; i++){
          if(weekParity === WEEK_PARITY.BOTH){
            item.lessons.push(schedule[weekDay-1].lessons[i]);
          }else{
            if(schedule[weekDay-1].lessons[i].parity === weekParity || schedule[weekDay-1].lessons[i].parity === WEEK_PARITY.BOTH){
              item.lessons.push(schedule[weekDay-1].lessons[i]);
            }
          }
        }

        result.push(item);
      }

      callback(result);
    }
  });
};

module.exports = Group;