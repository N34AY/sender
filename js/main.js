window.onload = async function main() {
    if (localStorage.getItem('extoken')) {
        displayFindExtension()
    } else displayLoginWindow()
    
    // run sender
    document.getElementById('startButton').onclick = function() {
        Notifications.sendMessStartNotify
        var inner_text = document.getElementById('inviteInput').value
        var banned_val = document.getElementById('bannedInput').value
        var banned = banned_val.split(',')
        if (inner_text.length < 15) alert('Текст сообщения должен быть не менее 15 символов!')
        else {
            var time = new Date().toLocaleTimeString().slice(0,-3)
            document.getElementById('messageStatus').innerHTML = 'Запущена в: ' + time
            document.getElementById('messageStatus').className = 'run'
            startMessage(inner_text, banned)
            Notifications.sendMessStartNotify()
        }
    }
    document.getElementById('sendLetterButton').onclick = function() {
        Notifications.sendLettersStartNotify
        var inner_subject = document.getElementById('subjectInput').value
        var inner_text = document.getElementById('letterInput').value
        var banned_val = document.getElementById('bannedInputLetters').value
        var banned = banned_val.split(',')
        var photo_id = document.getElementById('choosenPhoto').dataset.id
        console.log(typeof(photo_id))
        if (inner_subject.length < 5) alert('Тема письма должна быть не менее 5 символов!')
        else if (inner_text.length < 200 ) alert('Текст письма должен быть не менее 200 символов!')
        else if (photo_id === 'none') alert('Выберите фото для рассылки писем!')
        else {
            var time = new Date().toLocaleTimeString().slice(0,-3)
            document.getElementById('lettersStatus').innerHTML = 'Запущена в: ' + time
            document.getElementById('lettersStatus').className = 'run'
            startLetter(inner_subject, inner_text, photo_id, banned)
            Notifications.sendLettersStartNotify()
        }
    }
}