function useSynonyms(text) {
    function chooseRandomWord(string) {
        function random(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min)) + min
        }
        var words = string.split(',')
        console.log('words: ' + words)
        var word = words[random(0, words.length)]
        console.log('word: ' + word)
        return word  
    }
    while (text.indexOf('{', 0) != -1) {
        var obrace = text.indexOf('{', 0)
        var cbrace = text.indexOf('}', 0)
        var synblock = text.substr(obrace, cbrace - obrace)
        synblock = synblock.replace('{', '')
        synblock = synblock.replace('}', '')
        var repword = chooseRandomWord(synblock)
        var text = text.replace('{' + synblock + '}', repword)
    }
    return text
}
function sendLetter(id, text, subject, photo_id) {
    likeMan(id)
    var url_template = `https://find-bride.com/mess/send/all/${id}/1`
    var url = url_template.replace('{id}', id)
    var request = new XMLHttpRequest()
    var formData = new FormData()
    formData.append("is_autosave", "1")
    formData.append("go", 'Send')
    formData.append("form[value3]", subject)
    formData.append("form[value36]", photo_id)
    formData.append("real", text)
    request.open( "POST", url, false )
    request.send(formData)
    sendLogToServer(id, 'letter', text, subject, photo_id)
}
function startLetter( inner_subject, inner_text, photo_id, banned ) {
    var mans_array = getMansOnline()
    function sendWithTimer(i) {
        var text = inner_text
        var subject = inner_subject
        while (text.indexOf('{name}') != -1 || text.indexOf('{age}') != -1 || subject.indexOf('{name}') != -1 || subject.indexOf('{age}') != -1) {
            var text = text.replace('{name}', mans_array[i].n)
            var text = text.replace('{age}', mans_array[i].e)
            var subject = subject.replace('{name}', mans_array[i].n)
            var subject = subject.replace('{age}', mans_array[i].e)
            subject = subject
            text = text
        }
        text = useSynonyms(text)
        if (banned.includes(mans_array[i].id) == false) setTimeout(() => { sendLetter(mans_array[i].id, text, subject, photo_id) }, timer)
        else console.log('[Sender] banned man: ' + mans_array[i].id)
    }
    var timer = 0
    for(var i = 0; i < mans_array.length; i++){
        sendWithTimer(i)
        timer = timer + 3000
    }
    time = (mans_array.length * 1.3) * 1000
    setTimeout(() => {Notifications.sendLettersFinishNotify(mans_array.length)}, time)
}