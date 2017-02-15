/**
 * Модуль для работы с telegram-ботами
 * @type {object}
 */
var TelegramBot = require('node-telegram-bot-api');

/**
 * Содержит токен телеграм-бота
 * @type {string}
 */
var telegramBotToken = require('./config/TelegramBotToken');

/**
 * Создаёт объект модуля TelegramBot
 * @type {TelegramBot}
 */
var bot = new TelegramBot(telegramBotToken, {polling: true});

/**
 * Модуль для работы с расписанием
 * @type {object}
 */
var Schedule = require('./schedule/schedule.js');