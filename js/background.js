function sendLogToServer(accountId, type, message, subject, photoId) {
	var data = {
		type: type,
		user_email: localStorage.getItem('exemail'),
		message: message,
		subject: subject,
		photo: photoId,
		account: accountId,
	}
	let json = JSON.stringify(data)

	const options = { headers: { 'Content-Type': 'application/json' } }

	try {
		axios.post('https://ancrush.com/api/logging/add', json, options)
	} catch (error) {
		console.log(error)
	}
}


async function getMans() {
	requestUrl = 'https://find-bride.com/api/v2/chat/get_online_new.json'

	try {
		const response = await axios.get(requestUrl)
		var mansObj = response.data.content.online

		var mans = Object.values(mansObj).map(v => v)
		return mans
	} catch (error) {
		console.error(error)
		return null
	}
}
function updateMansValue(value) {
	document.getElementById('online').innerHTML = value
}


function replaceTagsInMessage(innerMessage, man) {
	var message = innerMessage
	while (message.indexOf('{name}') != -1) {
		var message = message.replace('{name}', man.n)
		message = message
	}
	while (message.indexOf('{age}') != -1) {
		var message = message.replace('{age}', man.e)
		message = message
	}
	return message
}
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


function sendMessageToMan(man, message) {
	likeMan(man.id)

	var data = new FormData()
	data.append("w", "62")
	data.append("correct_user", man.id)
	data.append("text", message)
	data.append("xsrf", "123")

	var headers = { 'Content-Type': 'multipart/form-data' }

	requestUrl = `https://find-bride.com/chat/set_mess`
	axios.post(requestUrl, data, headers)
	console.log(`man: ${man.id}, message: ${message}`)

	//sendLogToServer(man.id, 'message', message)
}
function sendLetterToMan(man, letterText, letterSubject, photoId) {
	likeMan(man.id)

	var data = new FormData()
	data.append("is_autosave", "1")
	data.append("go", 'Send')
	data.append("form[value3]", letterSubject)
	data.append("form[value36]", photoId)
	data.append("real", letterText)


	var headers = { 'Content-Type': 'multipart/form-data' }

	requestUrl = `https://find-bride.com/mess/send/all/${man.id}/1`
	axios.post(requestUrl, data, headers)
	console.log(`man: ${man.id}, subject: ${letterSubject}, message: ${letterText}, photo: ${photoId}`)

	//sendLogToServer(man.id, 'letter', letterText, letterSubject, photoId)
}
function likeMan(id) {
	const requestUrl = `https://find-bride.com/profile/addfriends/addMan/${id}?api=1`
	try {
		axios.get(requestUrl)
	} catch (error) {
		console.log('can`t like man')
	}
}


async function getGirlPhotos () {
	try {
		const requestUrl = 'https://find-bride.com/mess/photo'
		const response = await axios.get(requestUrl)

		const page = document.createElement('div')
        page.innerHTML = response.data
        var photosItems = page.getElementsByClassName('item item-list')
		var photos = "<div id='girlPhotosContainer'>"
		
		for (var i = 1; i < photosItems.length; i++) {
            var photoIdText = photosItems[i].id
            var photoId = photoIdText.replace('item_', '')
            var photoElem = photosItems[i].getElementsByTagName('img')
            var photoLink = photoElem[0].src
            photos = photos + `<img class="girlPhoto" id="girlPhoto" data-id="${photoId}" src="${photoLink}"></img>`
        }
		photos = photos + "</div>"
		return photos
	} catch (error) {
		console.log(error)
	}
}



chrome.runtime.onConnect.addListener(function (port) {
	console.assert(port.name == 'messagesSenderService')
	port.onMessage.addListener(async function (senderService) {
/* 		if (senderService.sendType == 'checkAuth') {
			var profileId = senderService.profileId
			var email = senderService.email
			var password = senderService.password

			if (profileId && email && password) {
				var data = {email: email, password: password, account: profileId}
				let json = JSON.stringify(data)
				const options = { headers: { 'Content-Type': 'application/json' } }
				const requestUrl = 'https://ancrush.com/auth/api'

				try {
					const response = await axios.post(requestUrl, json, options)
					if (response.data.status == 'success') {
						port.postMessage({ message: 'Авторизация успешна', auth: true })
						localStorage.setItem('authToken', response.data.token)
					} else throw 'Неправильный логин или пароль'
				} catch (error) {
					port.postMessage({ message: error, auth: false })
				}
			} else port.postMessage({ message: 'Неправильный логин или пароль', auth: false })
		} */

		var mans = await getMans()
		var sendsCount = 0
		var timer = 0
		if (!mans) port.postMessage({ message: 'Пользователи не найдены', error: true })

		if (senderService.sendType == 'invite') {
			if (!senderService.message) port.postMessage({ message: 'Не корртеный текст сообщения', error: true })

			sendMessStartNotify()
			mans.forEach(man => {
				var newMessage = replaceTagsInMessage(senderService.message, man)
				var banned = []

				if (!banned.includes(man.id)) {
					setTimeout(() => {
						sendMessageToMan(man, newMessage)
						port.postMessage({ message: 'ЗАПУЩЕНА', mansAmount: mans.length, sendsCount: ++sendsCount, sendedMessage: newMessage, error: false })
					}, timer)
					timer = timer + 1300
				}
			})
			setTimeout(() => { sendMessFinishNotify(mans.length) }, (mans.length * 1.3) * 1000)
		} else if (senderService.sendType == 'letter') {
			if (!senderService.letterText || !senderService.letterSubject || !senderService.photoId) port.postMessage({ message: 'Заполните', error: true })

			sendLettersStartNotify()
			mans.forEach(man => {
				var newLetterText = replaceTagsInMessage(senderService.letterText, man)
				newLetterText = useSynonyms(newLetterText)
				var newLetterSubject = replaceTagsInMessage(senderService.letterSubject, man)
				var banned = []

				if (!banned.includes(man.id)) {
					setTimeout(() => {
						sendLetterToMan(man, newLetterText, newLetterSubject, senderService.photoId)
						port.postMessage({ message: 'ЗАПУЩЕНА', mansAmount: mans.length, sendsCount: ++sendsCount, sendedMessage: newLetterText, error: false })
					}, timer)
					timer = timer + 1300
				}
			})
			setTimeout(() => { sendLettersFinishNotify(mans.length) }, (mans.length * 1.3) * 1000)
		} else {
			port.postMessage({ message: 'ошибка', error: true })
		}

		if (senderService.getPhotos) {
			var photos = await getGirlPhotos()
			console.log(photos);
			port.postMessage({ photos: photos })
		}
	})
})