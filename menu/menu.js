/**
 * Содержит разметки клавиатур
 * @type {object}
 */
var keyboards = require('./keyboards.js');
var User = require('../user/user.js');
User = new User();
/**
 * Создаёт экземпляр класса Menu
 *
 * @this {Menu}
 * @constructor
 */
function Menu(bot) {
  this.bot = bot;
}
this.userOptions = {};

//TODO: сделать подгрузку из БД
/**
 * Пользовательские настройки
 * @type {object}
 */

Menu.prototype.checkUser = function () {

};


Menu.prototype.showStartMenu = function (msg) {
  this.bot.sendMessage(msg.from.id,'Преветствую тебя, '+msg.chat.first_name+'!'+
  ' Я бот, который упростит твою жизнь с расписанием в самом неклассическом университете' +
    'по следующим командам я могу тебе помочь: *тута команды типа будут*');

  User.getOptions(msg.from.id, function (userOptions) {
  });
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

  /**
   * Условия главного меню и переходы в подменю
   */
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

  /**
   * Условия подменю "Настройки профиля" и его подменю
   */
  if (callbackQuery.data == 'settingsBack'){
    this.bot.editMessageText('Выберите что вы хотите сделать', {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboards.keyboardHelloMenu.reply_markup
    });
  }


  if (callbackQuery.data == 'userGroup'){
    var options = {
      reply_markup: JSON.stringify({
        keyboard: [
          [{ text: 'Обновить мою группу'},{text: 'Отмена'}]
        ]
      })
    };

    this.bot.editMessageText('Выбери что ты хочешь сделать', {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id
    },options);


//TODO: доеделать функционал для изменения группы пользователя

  }

  if (callbackQuery.data == 'notificationDay'){
    //TODO: user.getOptions(callback.from.id, function(){})

    userOptions.notificationDay = !userOptions.notificationDay; //TODO: отправлять изменения сразу на сервер

    this.bot.answerCallbackQuery(callbackQuery.id,'✔Уведомления о расписании на день '
      + ((userOptions.notificationDay==true)?'включены':'выключены'),false);
     //TODO: изменение каждой клавиши на другой смайл при изменение.

    if (userOptions.notificationDay == true) {
      this.bot.editMessageText('Хотите выполнить настройку уведомлений сейчас?' +
        '(Если нажмете нет, то они автоматически отключатся)',
        {
        'chat_id': callbackQuery.from.id,
        'message_id': callbackQuery.message.message_id,
        'reply_markup': keyboards.keyboardYesOrNo.reply_markup
      });
    }
  }

  if (callbackQuery.data == 'notificationLesson') {
    userOptions.notificationNextLesson = !userOptions.notificationNextLesson;
    //TODO: изменение каждой клавиши на другой смайл при изменение.
    this.bot.answerCallbackQuery(callbackQuery.id, '✔Уведомления о следующей паре ' +
      ((userOptions.notificationNextLesson == true) ? 'включены' : 'выключены'), false);
  }

  /**
   * Подменю выбора ДА или НЕТ
   */
  if (callbackQuery.data == 'yes'){
    this.bot.editMessageText('Выберите удобное для Вас время, когда будет приходить' +
      ' расписание на следующий день. При нажатии на кнопку "Отмена", уведомления о' +
      ' расписании на следующий день будут выключены.',
      {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboards.keyboardNotificationTime.reply_markup
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

  /**
   * Подменю настройки уведомлений о расписании на следующий день
   */
  if (callbackQuery.data == 'morning'){
    this.bot.editMessageText('Выберите время', {
     'chat_id': callbackQuery.from.id,
     'message_id': callbackQuery.message.message_id,
     'reply_markup': keyboards.keyboardChooseTimeMorning.reply_markup
    });
  }

  if (callbackQuery.data == 'lunch'){
   this.bot.editMessageText('Выберите время', {
     'chat_id': callbackQuery.from.id,
     'message_id': callbackQuery.message.message_id,
     'reply_markup': keyboards.keyboardChooseTimeLunch.reply_markup
   });
  }

  if (callbackQuery.data == 'evening'){

    this.bot.editMessageText('Выберите время', {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboards.keyboardChooseTimeEvening.reply_markup
    });
  }

  if (callbackQuery.data == 'backChooseTime'){
    this.bot.editMessageText('Выберите удобное для Вас время, когда будет приходить ' +
      'расписание на следующий день. При нажатии на кнопку "Отмена", уведомления о ' +
      'расписании на следующий день будут выключены.',
      {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboards.keyboardNotificationTime.reply_markup
    });
  }

  /*
  Обработка выбранного времени для уведомлений пользователем
   */
  if (callbackQuery.data.split('_')[0] == 'Time' ){
    userOptions.notificationTime = callbackQuery.data.split('_')[1];
    this.bot.answerCallbackQuery(callbackQuery.id, 'Расписание будет Вам приходить в '
      +userOptions.notificationTime, false);

    this.bot.editMessageText('Настройки профиля', {
      'chat_id': callbackQuery.from.id,
      'message_id': callbackQuery.message.message_id,
      'reply_markup': keyboards.keyboardSettings.reply_markup
    });
  }
};

module.exports = Menu;