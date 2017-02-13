/**
 * Содержит разметки клавиатур
 * @type {object}
 */
var keyboards = require('./keyboards.js');

/**
 * Создаёт экземпляр класса Menu
 *
 * @this {Menu}
 * @constructor
 */
function Menu(bot) {
  console.log('lol');
  this.bot = bot;
}

//TODO: сделать подгрузку из БД
/**
 * Пользовательские настройки
 * @type {object}
 */
var userOptions = {
  notificationNextLesson: false,
  group: null,
  notificationDay: false
};

/**
 * Показать главное меню
 *
 * @param {string} msg
 */
Menu.prototype.showHelloMenu = function(msg) {
  this.bot.sendMessage(msg.chat.id, 'Выберите, что вы хотите сделать', keyboards.keyboardHelloMenu);
};

//TODO: заменить if на switch, наверное
/**
 * Обработчик событий callbackQuery
 *
 * @param {object} callbackQuery
 */
Menu.prototype.callbackQueryHandler = function(callbackQuery) {
  if (callbackQuery.data == 'settings') {
    //console.log(callbackQuery);


    this.bot.editMessageText('Настройки профиля', {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboards.keyboardSettings.reply_markup
    });
  }

  if (callbackQuery.data == 'groupSchedule'){
    this.bot.answerCallbackQuery(callbackQuery.id,'🛠В процессе разработки🛠',true);
  }

  if (callbackQuery.data == 'teacherSchedule'){
    this.bot.answerCallbackQuery(callbackQuery.id,'🛠В процессе разработки🛠',true);
  }

  if (callbackQuery.data == 'settingsBack'){
    this.bot.editMessageText('Выберите что вы хотите сделать', {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboards.keyboardHelloMenu.reply_markup
    });
  }

  if (callbackQuery.data == ''){

  }

  if (callbackQuery.data == 'notificationDay'){
    userOptions.notificationDay = !userOptions.notificationDay;
    //console.log(userOptions.notificationDay);

    this.bot.answerCallbackQuery(callbackQuery.id,'✔Уведомления о расписании на день ' + ((userOptions.notificationDay==true)?'включены':'выключены'),false);

     //TODO: изменение каждой клавиши на другой смайл при изменение.

    if (userOptions.notificationDay == true) {
      this.bot.editMessageText('Хотите выполнить настройку уведомлений сейчас?(Если нажмете нет, то они автоматически отключатся)', {
        'chat_id': callbackQuery.from.id,
        'message_id': callbackQuery.message.message_id,
        'reply_markup': keyboards.keyboardYesOrNo.reply_markup
      });
    }
  }

  if (callbackQuery.data == 'notificationLesson') {
    userOptions.notificationNextLesson = !userOptions.notificationNextLesson;
    // console.log(userOptions.notificationDay);

    //TODO: изменение каждой клавиши на другой смайл при изменение.

    this.bot.answerCallbackQuery(callbackQuery.id, '✔Уведомления о следующей паре ' + ((userOptions.notificationNextLesson == true) ? 'включены' : 'выключены'), false);
  }


  if (callbackQuery.data == 'yes'){

    this.bot.editMessageText('Настройки уведомлений', {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboards.keyboardNotificationSettings.reply_markup
    });

  }

  if (callbackQuery.data == 'no'){
    userOptions.notificationDay = false;
    this.bot.editMessageText('Настройки профиля', {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboards.keyboardSettings.reply_markup
    });
  }


};

module.exports = Menu;