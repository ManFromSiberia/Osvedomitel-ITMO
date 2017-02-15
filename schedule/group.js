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
 * @param {boolean} getFormatted вернуть не коллекцию, а форматированный текст
 */
Group.prototype.getSchedule = function(weekDay, weekParity, callback, getFormatted) {
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
      var schedule = body.faculties[0].departments[0].groups;
      var result = [];

      var group = {};
      group.group_name = schedule[0].group_name;
      group.study_schedule = [];
      var day = schedule[0].study_schedule;

      if (weekDay === WEEK_DAY.ALL){
        for (var dayIndex = 0, len = day.length; dayIndex < len; dayIndex++) {
          var item = {};
          item.weekday = day[dayIndex].weekday;
          item.lessons = [];

          for (var i = 0, len2 = day[dayIndex].lessons.length; i < len2; i++){
            if(weekParity === WEEK_PARITY.BOTH){
              item.lessons.push(day[dayIndex].lessons[i]);
            }else{
              if(day[dayIndex].lessons[i].parity === weekParity
                || day[dayIndex].lessons[i].parity === WEEK_PARITY.BOTH){
                item.lessons.push(day[dayIndex].lessons[i]);
              }
            }
          }

          if(item.lessons.length > 0){
            group.study_schedule.push(item);
          }
        }
      }else {
        var item = {};
        item.weekday = weekDay;
        item.lessons = [];

        for (var i = 0, len = day[weekDay-1].lessons.length; i < len; i++){
          if(weekParity === WEEK_PARITY.BOTH){
            item.lessons.push(day[weekDay-1].lessons[i]);
          }else{
            if(day[weekDay-1].lessons[i].parity === weekParity
              || day[weekDay-1].lessons[i].parity === WEEK_PARITY.BOTH){
              item.lessons.push(day[weekDay-1].lessons[i]);
            }
          }
        }

        if (item.lessons.length > 0){
          group.study_schedule.push(item);
        }

      }

      if (group.study_schedule.length > 0){
        result.push(group);
      }

      if(getFormatted){
        callback(format(result));
      }else{
        callback(result);
      }
    }
  });
};

/**
 * Форматирует переданную коллекцию
 */
function format(schedule) {
  var result = [];

  var date = new Date();
  //date.setDate( date.getDate() + 1);
  var dateString = date.getDate() + ' ' + options.MONTHS_STRING_LONG[date.getMonth()] + ' ' + date.getFullYear() + ' г.';
  var message = 'Расписание занятий для группы ' + schedule[0].group_name + '\n' +
                '<code>Сегодня ' + dateString + '</code>';
  result.push(message);

  var group =  schedule[0].study_schedule;


  for(var dayIndex = 0, len = group.length;  dayIndex < len; dayIndex++){
    var day = group[dayIndex];
    date.setDate( date.getDate() + dayIndex);
    message = '<b>'+options.WEEK_DAY_STRING[day.weekday]+'</b>' + '\n'; //+ '<code>\t\t' + dateString + '</code>' +'\n';

    for(var lessonIndex = 0, len2 = day.lessons.length; lessonIndex < len2; lessonIndex++){
      var lesson = day.lessons[lessonIndex];

      var type = '';
      switch (lesson.type){
        case '1': type = 'лек '; break;
        case '2': type = 'лаб '; break;
        case '3': type = 'прак'; break;
      }

      var aud_name = lesson.auditories[0].auditory_name;
      if(aud_name == null){
        aud_name = '';
      }else{
        aud_name = aud_name +' ауд., ';
      }

      var teach_name = lesson.teachers[0].teacher_name;
      if(teach_name == null){
        teach_name = '';
      }else{
        teach_name = '<code>'+ teach_name +'</code>\n';
      }

      message += '<code>' + lesson.time_start + '-' + lesson.time_end + '\t\t</code>' +
                '<i>' + options.WEEK_PARITY_STRING[lesson.parity] + '</i>\n' +
                '<code>' + type + '\t\t</code>' + '<b>' + lesson.subject + '</b>\n' +
                teach_name +
                '<i>' + aud_name + lesson.auditories[0].auditory_address + '</i>\n'+
                '\n';
    }
    message += '\n';
    result.push(message);
  }
  return result;
}
Group.prototype.format = format;

module.exports = Group;