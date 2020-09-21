const Notifications = {
    sendMessStartNotify: function () {
        var options = {
            type:  'basic',
            iconUrl: 'icon.png',
            title: 'Рассылка инвайтов запущена!',
            message: 'Я сообщу когда закончу 😉',
            contextMessage: 'Инвайты',
            priority: 2
        }
        chrome.runtime.sendMessage({id: "create", nid: '', params: options});
    },
    sendMessFinishNotify: function (amount) {
        var options = {
            type:  'basic',
            iconUrl: 'icon.png',
            title: 'Рассылка инвайтов завершена!',
            message: 'Было разослано: ' + amount + ' сообщений!',
            contextMessage: 'Инвайты',
            requireInteraction: true,
            priority: 2
        }
        chrome.runtime.sendMessage({id: "create", nid: '', params: options});
        const messages_sound = new Audio("https://freesound.org/data/previews/337/337049_3232293-lq.mp3");
        messages_sound.play();
        var time = new Date().toLocaleTimeString().slice(0,-3);
        document.getElementById('message_status').innerHTML = 'Завершена в: ' + time;
        document.getElementById('message_status').className = 'finish';
    },
    sendLettersStartNotify: function () {
        var options = {
            type:  'basic',
            iconUrl: 'icon.png',
            title: 'Рассылка писем запущена!',
            message: 'Я сообщу когда закончу 😉',
            contextMessage: 'Письма',
            priority: 2
        };
        chrome.runtime.sendMessage({id: "messStart", nid: '', params: options});
    },
    sendLettersFinishNotify: function (amount) {
        var options = {
            type:  'basic',
            iconUrl: 'icon.png',
            title: 'Рассылка писем завершена!',
            message: 'Было разослано: ' + amount + ' писем!',
            contextMessage: 'Письма',
            requireInteraction: true,
            priority: 2
        }
        chrome.runtime.sendMessage({id: "create", nid: '', params: options});
        const letters_sound = new Audio("https://freesound.org/data/previews/337/337049_3232293-lq.mp3");
        letters_sound.play();
        var time = new Date().toLocaleTimeString().slice(0,-3);
        document.getElementById('letters_status').innerHTML = 'Завершена в: ' + time;
        document.getElementById('letters_status').className = 'finish';
    },
}