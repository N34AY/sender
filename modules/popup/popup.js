
document.onclick = function(event){
    if (event.target.id == 'messagesShowBtn') {
        document.getElementById('innerInfo').style.display = 'none'
        document.getElementById('letterForm').style.display = 'none'
        document.getElementById('lettersShowBtn').className = 'btn btn-light nav_btn'

        event.target.className = 'btn btn-primary nav_btn'
        document.getElementById('messageForm').style.display = 'block'
    }
    if (event.target.id == 'lettersShowBtn') {
        document.getElementById('innerInfo').style.display = 'none'
        document.getElementById('messageForm').style.display = 'none'
        document.getElementById('messagesShowBtn').className = 'btn btn-light nav_btn'

        event.target.className = 'btn btn-primary nav_btn'
        document.getElementById('letterForm').style.display = 'block'
    }
    if (event.target.id == 'choosePhotoBtn') {
        var port = chrome.extension.connect({
            name: "Sample Communication"
       })
       port.postMessage("Hi BackGround");
       port.onMessage.addListener(function(msg) {
            console.log("message recieved" + msg);
       })
    }
}

