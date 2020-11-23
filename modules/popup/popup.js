

/* port.postMessage({sendType: 'getProfileId'})
port.onMessage.addListener(function(senderService) {
    if (senderService.profileId) profileId = senderService.profileId
    port.postMessage({sendType: 'checkAuth', email: 'admin@admin.com', password: 'fuck67UP', profileId: '1111'})
    port.onMessage.addListener(function(senderService) {
    if (senderService.auth) document.getElementById('mainWindow').display = 'block'
    else document.getElementById('mainWindow').display = 'none'
})
}) */


function displayGirlPhotos (photos) {
    Swal.fire({
        title: 'Выберите фото',
        html: photos,
        width: 1000,
        showCloseButton: true,
    })
    document.getElementById("girlPhotosContainer").onclick = function(event){
        if (event.target.id == 'girlPhoto') {
            var imgId = event.target.dataset.id
            var imgLink = event.target.src

            localStorage.setItem('choosenPhoto', JSON.stringify({id: imgId, link: imgLink}))
            document.getElementById('choosenPhoto').src = imgLink
            document.getElementById('choosenPhoto').dataset.id = imgId
            Swal.fire().close()
        }
    }
}


function updateSendMessagesStatus(mansAmount, sendsCount, sendedMessage, sendStatus) {
    document.getElementById('messagesSenderStatusBar').style.display = 'block'
    document.getElementById('messagesSendStatus').innerHTML = sendStatus
    document.getElementById('sendedMessage').innerHTML = sendedMessage
    document.getElementById('sendsMessagesCount').innerHTML = sendsCount
    document.getElementById('lettersMansAmount').innerHTML = mansAmount
}
function updateSendLettersStatus(mansAmount, sendsCount, sendedMessage, sendStatus) {
    document.getElementById('lettersSenderStatusBar').style.display = 'block'
    document.getElementById('lettersSendStatus').innerHTML = sendStatus
    document.getElementById('sendedLetter').innerHTML = sendedMessage
    document.getElementById('sendsLettersCount').innerHTML = sendsCount
    document.getElementById('messagesMansAmount').innerHTML = mansAmount
}
function displayServiceSenderError(errorMessage) {
    document.getElementById('messagesSenderErrorBar').style.display = 'block'
    document.getElementById('errorText').innerHTML = errorMessage
}
  

document.onclick = function(event) {
    if (event.target.id == 'messagesShowBtn') {
        document.getElementById('innerInfo').style.display = 'none'
        document.getElementById('letterForm').style.display = 'none'
        document.getElementById('lettersShowBtn').className = 'btn btn-light nav_btn'

        event.target.className = 'btn btn-primary nav_btn'
        document.getElementById('messageForm').style.display = 'block'

        var inviteText = localStorage.getItem('inviteText')
        if (inviteText) {
            document.getElementById('inviteInput').value = inviteText
            document.getElementById('inviteInput').focus()
        }
    }
    if (event.target.id == 'lettersShowBtn') {
        document.getElementById('innerInfo').style.display = 'none'
        document.getElementById('messageForm').style.display = 'none'
        document.getElementById('messagesShowBtn').className = 'btn btn-light nav_btn'

        event.target.className = 'btn btn-primary nav_btn'
        document.getElementById('letterForm').style.display = 'block'

        var letterData = JSON.parse(localStorage.getItem('letterData'))
        if (letterData) {
            document.getElementById('letterInput').value = letterData.letterText
            document.getElementById('letterInput').focus()
            document.getElementById('subjectInput').value = letterData.letterSubject
            document.getElementById('subjectInput').focus()
            var choosenPhoto = JSON.parse(localStorage.getItem('choosenPhoto'))
            if (choosenPhoto) document.getElementById('choosenPhoto').src = choosenPhoto.link
        }
    }
    if (event.target.id == 'messagesStart') {
        var port = chrome.runtime.connect({name: "messagesSenderService"})
        var message = document.getElementById('inviteInput').value     
        if (message) {
            localStorage.setItem('inviteText', message)
            port.postMessage({sendType: 'invite', message: message})
            port.onMessage.addListener(function(senderService) {
                if (!senderService.error) updateSendMessagesStatus(senderService.mansAmount, senderService.sendsCount, senderService.sendedMessage, senderService.message)
                else displayServiceSenderError(senderService.message)
            })
        }
    }
    if (event.target.id == 'lettersStart') {
        var port = chrome.runtime.connect({name: "messagesSenderService"})
        var letterText = document.getElementById('letterInput').value
        var letterSubject = document.getElementById('subjectInput').value
        var choosenPhoto = JSON.parse(localStorage.getItem('choosenPhoto'))
        var photoId = choosenPhoto.id
        if (letterText && letterSubject && photoId) {
            localStorage.setItem('letterData', JSON.stringify({letterText: letterText, letterSubject: letterSubject}))
            port.postMessage({sendType: 'letter', letterSubject: letterSubject, letterText: letterText, photoId: photoId})
            port.onMessage.addListener(function(senderService) {
                if (!senderService.error) updateSendLettersStatus(senderService.mansAmount, senderService.sendsCount, senderService.sendedMessage, senderService.message)
                else displayServiceSenderError(senderService.message)
            })
        } else alert('error')
    }
    if (event.target.id == 'choosePhotoBtn') {
        var port = chrome.runtime.connect({name: "messagesSenderService"})
        port.postMessage({getPhotos: true})
        port.onMessage.addListener(function(senderService) {
            if (senderService.photos) displayGirlPhotos(senderService.photos)
        })
    }
}