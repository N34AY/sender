chrome.runtime.onMessage.addListener(function(message, sender) {
    if (message && (message.id == "messend_start")){
        chrome.notifications.create(message.nid, message.params, function (notifId) {
            if (chrome.runtime.lastError) {
              window.alert(chrome.runtime.lastError.description);
              return;
            }
        });
    };
});