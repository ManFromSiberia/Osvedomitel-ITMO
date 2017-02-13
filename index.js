/**
 * Модуль для работы с telegram-ботами
 * @type {object}
 */
const TelegramBot = require('node-telegram-bot-api');

/**
 * Содержит токен телеграм-бота
 * @type {string}
 */
const telegramBotToken = require('./config/TelegramBotToken');

/**
 * Создаёт объект модуля TelegramBot
 * @type {TelegramBot}
 */
const bot = new TelegramBot(telegramBotToken, {polling: true});

/**
 * Модуль для работы с MongoDB
 * @type {object}
 */
const MongoClient = require('mongodb').MongoClient;

/**
 * Содержить url-адрес к бд MongoDB
 * @type {{url: string}}
 */
const db = require('./config/db');

/**
 * Модуль для работы с расписанием
 * @type {object}
 */
var schedule = require('./schedule/schedule.js');

schedule.Group('P3217').get(schedule.WEEK_DAY.WEDNESDAY, schedule.WEEK_PARITY.EVEN, function showSchedule(schedule) {
  //TODO processing and output
  console.log(schedule);
});