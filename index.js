const TelegramBot   = require('node-telegram-bot-api');
const MongoClient   = require('mongodb').MongoClient;
const token         = require('./config/TelegramBotToken').token;
const db            = require('./config/db');
const bot           = new TelegramBot(token, {polling: true});

/**
 * Начальное взаимодействие с новым юзером. Настройка профиля.
 */
/**
bot.onText(/\/start/, function (msg) {
  bot.sendMessage(msg.from.id, 'Нет времени объяснять, напиши номер своей группы. \n' +
                               'Например, P3217.');

  bot.onText(/([A-Z][0-9]{4})/, function (msg, match) {
    if (!(1 in match)) {
      var options = {
        reply_markup: JSON.stringify({
          keyboard: [
            [{ text: 'Попробовать снова'}],
            [{ text: 'Настрою профиль позже'}]
          ]
        })
      };

      bot.sendMessage(msg.from.id, 'Мне кажется, ты что-то путаешь. Я не нашёл эту группу. Попробуешь снова?', options)
      bot.onText(/Попробовать снова/, function (msg, match) {


      });
    }

  });
});
 */

bot.onText(/\/start/, function (msg) {
  showMenu(msg);

  bot.on('callback_query', function (msg) {
    var answer = msg.data.split('_');
    var level = answer[0];
    var item = answer[1];

    showMenu(msg);
  });
});

function showMenu(msg) {
  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Настроить профиль', callback_data: '0_1' }],
        [{ text: 'Расписание группы', callback_data: '0_2' }],
        [{ text: 'Расписание преподователя', callback_data: '0_3' }]
      ]
    })
  };

  chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id; // Если сообщение отправлял пользователь, то свойство
                                                                 // msg.chat.id, если же он кликал на кнопку,
                                                                 // то msg.from.id
  bot.sendMessage(chat, 'Главное меню', options);
}