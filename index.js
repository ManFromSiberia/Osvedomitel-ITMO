var bot = require('./telegrambot/telegramBot.js');

/**
 * Модуль для работы с расписанием
 * @type {object}
 */
var user = require('./user/user.js');
var user = new user();
var schedule = require('./schedule/schedule.js');
// Пример использования schedule
// schedule.Group('P3217').getSchedule(schedule.WEEK_DAY.WEDNESDAY, schedule.WEEK_PARITY.EVEN, function showSchedule(schedule) {
//   //TODO processing and output
//   console.log(schedule);
// });

/**
 * Содержит экземпляр объекта модуля Menu
 * @type {Menu}
 */
var Menu = require('./menu/menu.js');
var Menu = new Menu(bot);
bot.getMe().then(function (me) {
  console.log('Hi my name is %s! And i am running ✔️', me.username);
});

bot.onText(/\/start/, function(msg){
  Menu.showStartMenu(msg);
});

bot.onText(/\/menu/, function(msg){
  Menu.showHelloMenu(msg);
});

bot.on('callback_query', function(callbackQuery){
  Menu.callbackQueryHandler(callbackQuery);
});