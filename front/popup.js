document.getElementById('messagesShowBtn').onclick = function (element) {
  document.getElementById('innerInfo').style.display = 'none'
  document.getElementById('letterForm').style.display = 'none'
  document.getElementById('lettersShowBtn').className = 'btn btn-light nav_btn'

  element.target.className = 'btn btn-primary nav_btn'
  document.getElementById('messageForm').style.display = 'block'

  var inviteText = localStorage.getItem('inviteText')
  if (inviteText) {
    document.getElementById('inviteInput').value = inviteText
    document.getElementById('inviteInput').focus()
  }
}
document.getElementById('lettersShowBtn').onclick = function (element) {
  document.getElementById('innerInfo').style.display = 'none'
  document.getElementById('messageForm').style.display = 'none'
  document.getElementById('messagesShowBtn').className = 'btn btn-light nav_btn'

  element.target.className = 'btn btn-primary nav_btn'
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


function updateSendMessagesStatus(mansAmount, sendsCount, sendedMessage, sendStatus) {
  document.getElementById('messagesSenderStatusBar').style.display = 'block'
  document.getElementById('messagesSendStatus').innerHTML = sendStatus
  document.getElementById('sendedMessage').innerHTML = sendedMessage
  document.getElementById('sendsMessagesCount').innerHTML = sendsCount
  document.getElementById('messagesMansAmount').innerHTML = mansAmount
}
function updateSendLettersStatus(mansAmount, sendsCount, sendedMessage, sendStatus) {
  document.getElementById('lettersSenderStatusBar').style.display = 'block'
  document.getElementById('lettersSendStatus').innerHTML = sendStatus
  document.getElementById('sendedLetter').innerHTML = sendedMessage
  document.getElementById('sendsLettersCount').innerHTML = sendsCount
  document.getElementById('lettersMansAmount').innerHTML = mansAmount
}
function displayServiceSenderError(errorMessage) {
  document.getElementById('messagesSenderErrorBar').style.display = 'block'
  document.getElementById('errorText').innerHTML = errorMessage
}


function displayGirlPhotos(photos) {
  Swal.fire({
    title: 'Выберите фото',
    html: photos,
    width: 1000,
    showCloseButton: true,
  })
  document.getElementById("girlPhotosContainer").onclick = function (event) {
    if (event.target.id == 'girlPhoto') {
      var imgId = event.target.dataset.id
      var imgLink = event.target.src

      localStorage.setItem('choosenPhoto', JSON.stringify({ id: imgId, link: imgLink }))
      document.getElementById('choosenPhoto').src = imgLink
      document.getElementById('choosenPhoto').dataset.id = imgId
      Swal.fire().close()
    }
  }
}


console.log(window);

document.getElementById('choosePhotoBtn').onclick = function () {
  var port = chrome.runtime.connect({ name: "photosService" })
  port.postMessage({ getPhotos: true })
  port.onMessage.addListener(function (pm) {
    if (pm.photos) displayGirlPhotos(pm.photos)
  })
}

document.getElementById('messagesStart').onclick = async function () {
  var port = chrome.runtime.connect({ name: "invitesService" })
  var message = document.getElementById('inviteInput').value
  if (message) {
    localStorage.setItem('inviteText', message)
    port.postMessage({ invite: true, account: 'await ids().account', message: message })
    port.onMessage.addListener(function (senderService) {
      console.log(senderService.mansAmount);
      if (!senderService.error) updateSendMessagesStatus(senderService.mansAmount, senderService.sendsCount, senderService.sendedMessage, senderService.message)
      else displayServiceSenderError(senderService.message)
    })
  }
}

document.getElementById('lettersStart').onclick = function () {
  var port = chrome.runtime.connect({ name: "lettersService" })
  var letterText = document.getElementById('letterInput').value
  var letterSubject = document.getElementById('subjectInput').value
  var choosenPhoto = JSON.parse(localStorage.getItem('choosenPhoto'))
  var photoId = choosenPhoto.id
  if (letterText && letterSubject && photoId) {
    localStorage.setItem('letterData', JSON.stringify({ letterText: letterText, letterSubject: letterSubject }))
    port.postMessage({ letter: true, account: 'test@gmail.com', letterSubject: letterSubject, letterText: letterText, photoId: photoId })
    port.onMessage.addListener(function (senderService) {
      if (!senderService.error) updateSendLettersStatus(senderService.mansAmount, senderService.sendsCount, senderService.sendedMessage, senderService.message)
      else displayServiceSenderError(senderService.message)
    })
  } else alert('error')
}
