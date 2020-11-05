function sendMessage(id, text) {
    likeMan(id)
    var url = 'https://find-bride.com/chat/set_mess'
    var request = new XMLHttpRequest()
    var formData = new FormData()
    formData.append("w", "62")
    formData.append("correct_user", id)
    formData.append("text", text)
    formData.append("xsrf", "123")
    request.open("POST", url, true)
    request.send(formData)
    sendLogToServer(id, 'message', text )
};
function startMessage(inner_text, banned){
    var mans_array = getMansOnline()
    function sendWithTimer(i) {
        var text = inner_text
        while (text.indexOf('{name}') != -1 || text.indexOf('{age}') != -1) {
            var text = text.replace('{name}', mans_array[i].n)
            var text = text.replace('{age}', mans_array[i].e)
            text = text
        }
        if (banned.includes(mans_array[i].id) == false) setTimeout(() => { sendMessage(mans_array[i].id, text) }, timer)
        else console.log('[Sender] banned man: ' + mans_array[i].id)
    }
    var timer = 0
    for(var i = 0; i < mans_array.length; i++){
        sendWithTimer(i)
        timer = timer + 1300
    }
    time = (mans_array.length * 1.3) * 1000
    setTimeout(() => {Notifications.sendMessFinishNotify(mans_array.length)}, time)
}
