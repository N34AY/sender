function sendLetterToMan(manId, letterText, letterSubject, photoId) {
  var data = new FormData()
  data.append("is_autosave", "1")
  data.append("go", 'Send')
  data.append("form[value3]", letterSubject)
  data.append("form[value36]", photoId)
  data.append("real", letterText)

  var headers = { 'Content-Type': 'multipart/form-data' }

  axios.post(`https://find-bride.com/mess/send/all/${manId}/1`, data, headers)
  console.log(`man: ${manId}, subject: ${letterSubject}, message: ${letterText}, photo: ${photoId}`)
}


chrome.runtime.onConnect.addListener(function (port) {
  if (port.name == "lettersService") {
    port.onMessage.addListener(async function (pm) {
      let sendsCount = 0
      let timer = 0
      const mans = await getMans()

      if (pm.letter && pm.account && pm.letterSubject && pm.letterText && pm.photoId) {
        sendLettersStartNotify()
        mans.forEach(async man => {
/*           let status = await checkIsBanned('test@gmail.com', pm.account, man.id)
          if (status.banStatus == "banned") return */

          let newLetterText = replaceTagsInMessage(pm.letterText, man)
          newLetterText = useSynonyms(newLetterText)
          let newLetterSubject = replaceTagsInMessage(pm.letterSubject, man)

          setTimeout(() => {
            sendLetterToMan(man.id, newLetterText, newLetterSubject, pm.photoId)
            likeMan(man.id)
            sendLogToServer('letter', newLetterText, pm.account, man.id, newLetterSubject, pm.photoId)
            port.postMessage({ message: 'ЗАПУЩЕНА', mansAmount: Object.keys(mans).length, sendsCount: ++sendsCount, sendedMessage: newLetterText, error: false })
          }, timer)
          timer = timer + 1300
        })
        setTimeout(() => { sendLettersFinishNotify(mans.length) }, (mans.length * 1.3) * 1000)
      }
    })
  }
})
