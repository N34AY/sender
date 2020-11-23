function sendMessStartNotify() {
    const options = {
        type:  'basic',
        iconUrl: '64.png',
        title: 'Рассылка инвайтов запущена!',
        message: 'Я сообщу когда закончу 😉',
        contextMessage: 'Инвайты',
        priority: 2
    }
    chrome.notifications.create('', options, function () {})
}
function sendMessFinishNotify(amount) {
    const options = {
        type:  'basic',
        iconUrl: '64.png',
        title: 'Рассылка инвайтов завершена!',
        message: 'Было разослано: ' + amount + ' сообщений!',
        contextMessage: 'Инвайты',
        requireInteraction: true,
        priority: 2
    }
    const messages_sound = new Audio("https://freesound.org/data/previews/337/337049_3232293-lq.mp3")
    messages_sound.play()
    chrome.notifications.create('', options, function () {})
}


function sendLettersStartNotify() {
    const options = {
        type:  'basic',
        iconUrl: '64.png',
        title: 'Рассылка писем запущена!',
        message: 'Я сообщу когда закончу 😉',
        contextMessage: 'Письма',
        priority: 2
    }
    chrome.notifications.create('', options, function () {})
}
function sendLettersFinishNotify(amount) {
    const options = {
        type:  'basic',
        iconUrl: '64.png',
        title: 'Рассылка писем завершена!',
        message: 'Было разослано: ' + amount + ' писем!',
        contextMessage: 'Письма',
        requireInteraction: true,
        priority: 2
    }
    const letters_sound = new Audio("https://freesound.org/data/previews/337/337049_3232293-lq.mp3")
    letters_sound.play()
    chrome.notifications.create('', options, function () {})
}