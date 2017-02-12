const TelegramBot   = require('node-telegram-bot-api');
const MongoClient   = require('mongodb').MongoClient;
const token         = require('./config/TelegramBotToken');
const db            = require('./config/db');
const bot           = new TelegramBot(token, {polling: true});

var schedule = require('./schedule/schedule.js');
var group = schedule.getGroup('P3217');