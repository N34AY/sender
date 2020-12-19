function sendMessageToMan(man, message) {
  const data = new FormData()
  data.append("w", "62")
  data.append("correct_user", man.id)
  data.append("text", message)
  data.append("xsrf", "123")

  var headers = { 'Content-Type': 'multipart/form-data' }

  axios.post(`https://find-bride.com/chat/set_mess`, data, headers)
  console.log(`man: ${man.id}, message: ${message}`)
}


chrome.runtime.onConnect.addListener(function (port) {
  if (port.name == "invitesService") {
    port.onMessage.addListener(async function (pm) {
      let sendsCount = 0
      let timer = 0
      const mans = await getMans()

      if (pm.invite && pm.account && pm.message) {
        sendMessStartNotify()
        mans.forEach(async man => {
          setTimeout(async () => {
/*             let status = await checkIsBanned('test@gmail.com', pm.account, man.id)
            if (status.banStatus == "banned") return */

            let message = replaceTagsInMessage(pm.message, man)
            sendMessageToMan(man, message)
            likeMan(man.id)
            sendLogToServer('message', message, pm.account, man.id, '', '')
            port.postMessage({ message: 'ЗАПУЩЕНА', mansAmount: Object.keys(mans).length, sendsCount: ++sendsCount, sendedMessage: message, error: false })
          }, timer)
          timer = timer + 1300
        })
        setTimeout(() => { sendMessFinishNotify(mans.length) }, (mans.length * 1.3) * 1000)
      }
    })
  }
})
