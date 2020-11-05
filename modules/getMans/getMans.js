function updateMansValue (value) {
    var indicator = document.getElementById('online')
    indicator.innerHTML = value
}

function getMansOnline () {
    var request = new XMLHttpRequest()
    request.open( "GET", 'https://find-bride.com/api/v2/chat/get_online_new.json', false )
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                console.log('[Sender]: list of men received')
            } else {
                console.error('[Sender]: failed to get mans')
            }
        }
    }
    request.send()
    var data = JSON.parse(request.responseText)
    var list = data.content.online
    var mans_array = []
    for (var item in list) {
        var man = list[item]
        mans_array.push(man)
    }
    updateMansValue(mans_array.length)
    return mans_array
}