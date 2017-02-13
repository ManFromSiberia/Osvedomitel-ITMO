/**
 * Содержит путями к API ISU
 * @type {object}
 */
const PATHS = require('../config/IsuApiURL.js');

/**
 * Содержит токен для использования API ISUПодключаем файл с путями к API ISU
 * @type {string}
 */
const ISU_API_TOKEN = require('../config/IsuApiToken.js');

/**
 * Модуль для работы с http[s]-запросами
 * @type {request}
 */
var request = require('request');

/**
 * Содержит константы чётности недели и дней недели
 * @type {object}
 */
var consts = require('./consts.js');

/**
 * Содержит дни недели
 * @type {object}
 */
const WEEK_DAY = consts.WEEK_DAY;

/**
 * Содержит чётность недели
 * @type {object}
 */
const WEEK_PARITY = consts.WEEK_PARITY;

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
 * @param {object} callback callback-фукнция, получающая результат на обработку
 */
Group.prototype.getSchedule = function(weekDay, weekParity, callback) {
  var url = PATHS.host + PATHS.basepath + '/schedule/common/group/'+ ISU_API_TOKEN + '/' + this.groupName;

  /**
   * Опции для запроса
   * Подробнее: https://www.npmjs.com/package/request#requestoptions-callback
   */
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
      //Будет содержать результат
      var result = [];
      //Вспомогательная переменная, содержит расписание на день
      var item = {};

      if (weekDay == WEEK_DAY.ALL){
        for (var day = 0, len = schedule.length; day < len; day++) {
          item.weekday = day;
          item.lessons = [];

          for (var i = 0, len2 = schedule[day-1].lessons.length; i < len2; i++){
            if(weekParity == WEEK_PARITY.BOTH){
              item.lessons.push(schedule[day-1].lessons[i]);
            }else{
              if(schedule[day-1].lessons[i].parity === weekParity || schedule[day-1].lessons[i].parity === WEEK_PARITY.BOTH){
                item.lessons.push(schedule[day-1].lessons[i]);
              }
            }
          }

          result.push(item);
        }
      }else {
        item.weekday = weekDay;
        item.lessons = [];

        for (var i = 0, len = schedule[weekDay-1].lessons.length; i < len; i++){
          if(weekParity == WEEK_PARITY.BOTH){
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