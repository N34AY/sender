chrome.runtime.onMessage.addListener(function(message, sender) {
    if (message && (message.id == "create")) {
        chrome.notifications.create(message.nid, message.params, function () {
            if (chrome.runtime.lastError) {
                window.alert(chrome.runtime.lastError.description)
                return
            }
        })
    } 
})