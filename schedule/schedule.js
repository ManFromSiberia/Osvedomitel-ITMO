/**
 * Модуль для работы с группами
 * @type {Group}
 */
var Group = require('./group.js');

/**
 * Содержит константы чётности недели и дней недели
 */
const consts = require('./consts.js');

/**
 * Содержит дни недели
 * @type {object}
 */
module.exports.WEEK_DAY = consts.WEEK_DAY;

/**
 * Содержит чётность недели
 * @type {object}
 */
module.exports.WEEK_PARITY = consts.WEEK_PARITY;

/**
 * Создаёт экземпляр класса Group
 * @param {string} groupName номер группы
 * @returns {Group}
 * @constructor
 */
module.exports.Group = function (groupName) {
  return new Group(groupName);
};

/**
 * Создаёт экземпляр класса Teacher
 * @param {number} teacherId ID Преподавателя
 * @returns {Teacher}
 * @constructor
 */
module.exports.Teacher = function (teacherId) {
  // return new Teacher(teacherId);
};







