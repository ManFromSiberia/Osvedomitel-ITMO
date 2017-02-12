const bot = require('./index.js');
// bot.onText(/\/start/, function (msg) {
//   showHelloMenu(msg);
//
//
//
//
//
// })



function showHelloMenu(msg) {
  var keyboard = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: '⚙Настроить профиль', callback_data: 'settings' }],
        [{ text: '📅👥Расписание группы', callback_data: 'groupSchedule' }],
        [{ text: '📅👤Расписание преподователя', callback_data: 'teachSchedule' }]
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Выберите что вы хотите сделать', keyboard);
  bot.editMessageText('Edited', keyboard.callback.id);
}


exports.showHelloMenu = showHelloMenu;