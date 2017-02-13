module.exports.keyboardHelloMenu = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '⚙Настроить профиль', callback_data: 'settings' }],
      [{ text: '📅👥Расписание группы', callback_data: 'groupSchedule' }],
      [{ text: '📅👤Расписание преподователя', callback_data: 'teacherSchedule' }]
    ]
  })
};

module.exports.keyboardSettings = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '🎓Номер вашей группы', callback_data: 'userGroup' }],
      [{ text: '🔔Уведомление о следующей паре', callback_data: 'notificationLesson' }],
      [{ text: '🔔Уведомления о расписание на день', callback_data: 'notificationDay' }],
      [{ text: '⬅️Вернуться назад', callback_data: 'settingsBack' }]
    ]
  })
};

module.exports.keyboardYesOrNo = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '✔Да', callback_data: 'yes' }],
      [{ text: '✖️Нет', callback_data: 'no' }]
    ]
  })
};

module.exports.keyboardNotificationSettings = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '⚙Настроить профиль', callback_data: 'settings' }],
      [{ text: '📅👥Расписание группы', callback_data: 'groupSchedule' }],
      [{ text: '📅👤Расписание преподователя', callback_data: 'teacherSchedule' }]
    ]
  })
};