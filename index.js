const TelegramBot   = require('node-telegram-bot-api');
const MongoClient   = require('mongodb').MongoClient;
const token         = require('./config/TelegramBotToken').token;
const db            = require('./config/db');
const bot           = new TelegramBot(token, {polling: true});
const menu          = require('./Menu.js');
exports.bot = bot;
bot.getMe().then(function (me) {
  console.log('Hi my name is %s! And i am running ✔️', me.username);
});


bot.onText(/\/start/, function (msg) {
  showHelloMenu(msg);
});

bot.onText(/\/menu/, function (msg) {
  bot.sendMessage(msg.chat.id, 'Выберите что вы хотите сделать', keyboardMenu);
});

/*
Объявление разлчного функционала меню
*/
var userOptions = {
  notificationNextLesson: false,
  group: null,
  notificationDay: false
};


//Main menu
var keyboardHelloMenu = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '⚙Настроить профиль', callback_data: 'settings' }],
      [{ text: '📅👥Расписание группы', callback_data: 'groupSchedule' }],
      [{ text: '📅👤Расписание преподователя', callback_data: 'teacherSchedule' }]
    ]
  })
};
var keyboardSettings = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '⚙Номер вашей группы', callback_data: 'userGroup' }],
      [{ text: '📅👥Уведомление о следующей паре', callback_data: 'notificationLesson' }],
      [{ text: '📅👤Уведомления о расписание на день', callback_data: 'notificationDay' }],
        [{ text: '⬅️Вернуться назад', callback_data: 'settingsBack' }]
    ]
  })
};
var keyboardYesOrNo = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '✔Да', callback_data: 'yes' }],
      [{ text: '✖️Нет', callback_data: 'no' }]
 ]
  })
};


/*
  Основной функционал
*/
function showHelloMenu(msg) {
  bot.sendMessage(msg.chat.id, 'Выберите что вы хотите сделать', keyboardHelloMenu);
}




/*
Обработка нажатия кнопки
Вынести модули
*/
bot.on('callback_query', function (callbackQuery) {

  if (callbackQuery.data == 'settings') {
    //console.log(callbackQuery);
    bot.editMessageText('Настройки профиля', {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboardSettings.reply_markup
    });
  }

  if (callbackQuery.data == 'groupSchedule'){
    bot.answerCallbackQuery(callbackQuery.id,'🛠В процессе разработки🛠',true);
  }

  if (callbackQuery.data == 'teacherSchedule'){
    bot.answerCallbackQuery(callbackQuery.id,'🛠В процессе разработки🛠',true);
  }

  if (callbackQuery.data == 'settingsBack'){
    bot.editMessageText('Выберите что вы хотите сделать', {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboardHelloMenu.reply_markup
    });
  }

  if (callbackQuery.data == ''){

  }

  if (callbackQuery.data == 'notificationDay'){
    userOptions.notificationDay = !userOptions.notificationDay;
    //console.log(userOptions.notificationDay);
    bot.answerCallbackQuery(callbackQuery.id,'✔Уведомления о расписании на день ' + ((userOptions.notificationDay==true)?'включены':'выключены'),false);

    if (userOptions.notificationDay == true) {
      bot.editMessageText('Хотите выполнить настройку уведомлений сейчас?(Если нажмете нет, то они автоматически отключатся)', {
        'chat_id': callbackQuery.from.id,
        'message_id': callbackQuery.message.message_id,
        'reply_markup': keyboardYesOrNo.reply_markup
      });
    }
  }

  if (callbackQuery.data == 'notificationLesson') {
    userOptions.notificationNextLesson = !userOptions.notificationNextLesson;
   // console.log(userOptions.notificationDay);
    bot.answerCallbackQuery(callbackQuery.id, '✔Уведомления о следующей паре ' + ((userOptions.notificationNextLesson == true) ? 'включены' : 'выключены'), false);
}


  if (callbackQuery.data == 'yes'){
    bot.editMessageText('Настройки уведомлений', {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboardSettings.reply_markup
    });

  }

  if (callbackQuery.data == 'no'){
    userOptions.notificationDay = false;
    bot.editMessageText('Настройки профиля', {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboardSettings.reply_markup
    });
  }


});
